import os
import sys
import json
import re
import time
import glob
from datetime import datetime, timezone

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LOGS_DIR = os.path.join(REPO_ROOT, ".agent-logs")
BRAIN_DIR = os.path.expanduser(r"~\.gemini\antigravity-ide\brain")
DEFAULT_AUTHOR = "Hameed-usman"
DEFAULT_TOOL = "antigravity"
DEFAULT_MODEL = "gemini-3.8-flash"
PROJECT_NAME = "8x_assesment"

def get_git_author():
    try:
        import subprocess
        res = subprocess.run(["git", "config", "user.name"], cwd=REPO_ROOT, capture_output=True, text=True)
        name = res.stdout.strip()
        if name:
            return name
    except Exception:
        pass
    return DEFAULT_AUTHOR

def clean_prompt(raw_content):
    if not raw_content:
        return ""
    # Extract inner content from <USER_REQUEST> if present
    m = re.search(r'<USER_REQUEST>\s*(.*?)\s*</USER_REQUEST>', raw_content, re.DOTALL)
    if m:
        return m.group(1).strip()
    return raw_content.strip()

def clean_response(raw_content):
    if not raw_content:
        return ""
    return raw_content.strip()

def parse_transcript(transcript_path):
    if not os.path.exists(transcript_path):
        return None

    entries = []
    with open(transcript_path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
                entries.append(data)
            except Exception:
                continue

    if not entries:
        return None

    # Group into exchanges: (USER_INPUT, subsequent steps until next USER_INPUT)
    exchanges = []
    current_turn = None

    for step in entries:
        step_type = step.get("type", "")
        source = step.get("source", "")
        created_at = step.get("created_at", "")

        if step_type == "USER_INPUT":
            if current_turn is not None:
                exchanges.append(current_turn)
            current_turn = {
                "prompt": clean_prompt(step.get("content", "")),
                "prompt_time": created_at,
                "response": None,
                "response_time": None,
                "model": DEFAULT_MODEL,
                "is_complete": False
            }
        elif current_turn is not None:
            if step_type == "PLANNER_RESPONSE" and source == "MODEL":
                content = step.get("content")
                if content and content.strip():
                    current_turn["response"] = clean_response(content)
                    current_turn["response_time"] = created_at
                    current_turn["is_complete"] = True

    if current_turn is not None:
        exchanges.append(current_turn)

    return exchanges

def format_log_markdown(session_id, exchanges, author=None, model=None, tool=None, project=None):
    if not exchanges:
        return None

    short_session = session_id[:8] if session_id else "session"
    author = author or get_git_author()
    model = model or DEFAULT_MODEL
    tool = tool or DEFAULT_TOOL
    project = project or PROJECT_NAME

    first_prompt_time = exchanges[0]["prompt_time"] or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    last_prompt_time = exchanges[-1]["prompt_time"] or first_prompt_time

    date_str = first_prompt_time[:10]
    total_exchanges = len(exchanges)

    # Frontmatter
    lines = [
        "---",
        f"session_id: {session_id}",
        f"date: {date_str}",
        f"author: {author}",
        f"model: {model}",
        f"tool: {tool}",
        f"project: {project}",
        f"total_exchanges: {total_exchanges}",
        f"first_prompt_time: {first_prompt_time}",
        f"last_prompt_time: {last_prompt_time}",
        "---",
        "",
        f"# Session Log - {date_str}",
        "",
        f"Session: `{short_session}` | Project: `{project}` | Author: `{author}`",
        "",
        "---",
        ""
    ]

    for idx, ex in enumerate(exchanges, 1):
        p_time = ex["prompt_time"] or first_prompt_time
        ex_model = ex.get("model") or model
        lines.append(f"[LOG_ENTRY type=PROMPT num={idx} session={short_session}]")
        lines.append(f"timestamp: {p_time}")
        lines.append(f"model: {ex_model}")
        lines.append("")
        lines.append(ex["prompt"])
        lines.append("")
        lines.append("")

        if ex["response"]:
            r_time = ex["response_time"] or p_time
            lines.append(f"[LOG_ENTRY type=RESPONSE num={idx} session={short_session}]")
            lines.append(f"timestamp: {r_time}")
            lines.append(f"model: {ex_model}")
            lines.append("")
            lines.append(ex["response"])
            lines.append("")
            lines.append("")

    return "\n".join(lines)

def process_transcript(transcript_path, session_id=None):
    if not os.path.exists(transcript_path):
        return None

    if not session_id:
        # Try inferring session_id from transcript path
        # typically .../brain/<session_id>/.system_generated/logs/transcript...
        parts = os.path.normpath(transcript_path).split(os.sep)
        for i, p in enumerate(parts):
            if p == ".system_generated" and i > 0:
                session_id = parts[i-1]
                break
        if not session_id:
            session_id = "default-session"

    exchanges = parse_transcript(transcript_path)
    if not exchanges:
        return None

    # Check if this transcript belongs to our project workspace
    # by checking if any exchange prompt references 8x_assesment or if transcript_path is our current session
    content_blob = ""
    try:
        with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
            content_blob = f.read(50000)
    except Exception:
        pass

    if "8x_assesment" not in content_blob and "8x assignment" not in content_blob.lower() and "capture test" not in content_blob.lower():
        # Not relevant to this project
        return None

    first_prompt_time = exchanges[0]["prompt_time"] or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    # Parse timestamp for filename: YYYY-MM-DD_HH-MM-SS
    try:
        dt = datetime.fromisoformat(first_prompt_time.replace("Z", "+00:00"))
        time_slug = dt.strftime("%Y-%m-%d_%H-%M-%S")
    except Exception:
        time_slug = datetime.now(timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")

    short_session = session_id[:8]
    log_filename = f"{time_slug}_{short_session}.md"
    os.makedirs(LOGS_DIR, exist_ok=True)
    target_path = os.path.join(LOGS_DIR, log_filename)

    md_content = format_log_markdown(session_id, exchanges)
    if md_content:
        # Atomic write
        temp_path = target_path + ".tmp"
        with open(temp_path, "w", encoding="utf-8") as f:
            f.write(md_content)
        os.replace(temp_path, target_path)
        return target_path

    return None

def process_all_recent():
    found = []
    pattern = os.path.join(BRAIN_DIR, "*", ".system_generated", "logs", "transcript_full.jsonl")
    for transcript_path in glob.glob(pattern):
        res = process_transcript(transcript_path)
        if res:
            found.append(res)
    return found

def run_daemon():
    print("Starting agent-capture daemon watching transcripts...", flush=True)
    while True:
        try:
            process_all_recent()
        except Exception as e:
            pass
        time.sleep(2)

def main():
    if "--daemon" in sys.argv:
        run_daemon()
        return

    # Only read stdin if --hook flag is provided
    stdin_payload = {}
    if "--hook" in sys.argv:
        try:
            raw = sys.stdin.read()
            if raw.strip():
                stdin_payload = json.loads(raw)
        except Exception:
            pass

    transcript_path = stdin_payload.get("transcriptPath")
    session_id = stdin_payload.get("conversationId")

    if transcript_path:
        full_path = transcript_path.replace("transcript.jsonl", "transcript_full.jsonl")
        if os.path.exists(full_path):
            process_transcript(full_path, session_id)
        else:
            process_transcript(transcript_path, session_id)
    else:
        process_all_recent()

    sys.stdout.write("{}\n")
    sys.stdout.flush()

if __name__ == "__main__":
    main()
