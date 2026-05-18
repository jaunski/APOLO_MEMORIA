from datetime import datetime
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEARTBEAT = ROOT / 'runtime' / 'heartbeat.json'
REPORT = ROOT / 'reports' / 'mesh_health_report.md'


def load_heartbeat():
    if HEARTBEAT.exists():
        return json.loads(HEARTBEAT.read_text(encoding='utf-8'))
    return {}


def generate_report(data):
    timestamp = datetime.utcnow().isoformat()

    lines = [
        '# Nova Mesh Health Report',
        '',
        f'- generated_at: {timestamp} UTC',
        f'- runtime: {data.get("runtime")}',
        f'- state: {data.get("state")}',
        '',
        '## Active Layers',
    ]

    for layer in data.get('active_layers', []):
        lines.append(f'- {layer}')

    lines.append('')
    lines.append('## Active Agents')

    for agent in data.get('active_agents', []):
        lines.append(f'- {agent}')

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text('\n'.join(lines), encoding='utf-8')


if __name__ == '__main__':
    heartbeat = load_heartbeat()
    generate_report(heartbeat)
    print('Nova Mesh audit report generated.')
