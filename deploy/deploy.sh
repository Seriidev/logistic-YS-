#!/usr/bin/env bash
# Yuusell Website — server deployment. Run after git pull:
#   ./deploy/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT/deploy/docker-compose.yml"
ENV_FILE="$ROOT/deploy/.env"
ENV_EXAMPLE="$ROOT/deploy/.env.example"
COMPOSE_PROJECT="yuusell-website"

log() { printf '\n[deploy] %s\n' "$*"; }
die() { printf '\n[deploy] ERROR: %s\n' "$*" >&2; exit 1; }

ensure_docker() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    return 0
  fi

  log "Docker not found — installing on Ubuntu..."
  if [[ ! -f /etc/os-release ]]; then
    die "Docker is required. Install Docker + Compose plugin, then re-run."
  fi

  # shellcheck disable=SC1091
  source /etc/os-release
  if [[ "${ID:-}" != "ubuntu" && "${ID_LIKE:-}" != *"debian"* ]]; then
    die "Auto-install supports Ubuntu/Debian only. Install Docker manually."
  fi

  sudo apt-get update -qq
  sudo apt-get install -y ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "${VERSION_CODENAME}") stable" |
    sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

  sudo apt-get update -qq
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  sudo systemctl enable --now docker
  log "Docker installed."
}

load_env() {
  if [[ ! -f "$ENV_FILE" ]]; then
    [[ -f "$ENV_EXAMPLE" ]] || die "Missing $ENV_FILE and $ENV_EXAMPLE"
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    log "Created $ENV_FILE from .env.example — edit values, then re-run."
    exit 0
  fi

  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a

  [[ -n "${VITE_API_URL:-}" ]] || die "VITE_API_URL is not set in deploy/.env"
  export APP_PORT="${APP_PORT:-4030}"
}

main() {
  cd "$ROOT"
  ensure_docker
  load_env

  log "Building and starting website..."
  docker compose -p "$COMPOSE_PROJECT" -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build

  log "Done. Website listening on 127.0.0.1:${APP_PORT}"
  log "Logs:  docker compose -p $COMPOSE_PROJECT -f deploy/docker-compose.yml logs -f website"
}

main "$@"
