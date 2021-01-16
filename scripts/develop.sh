#!/bin/bash

HOST="${1:-127.0.0.1}"
PORT="${2:-5000}"

set -ex

cd "$(dirname $0)/../public"

python -m http.server --bind "$HOST" -- "$PORT"
