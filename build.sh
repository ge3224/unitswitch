#!/bin/bash
set -e

# Install Deno if not present
if ! command -v deno &> /dev/null; then
    echo "Installing Deno..."
    curl -fsSL https://deno.land/install.sh | sh
    export DENO_INSTALL="$HOME/.deno"
    export PATH="$DENO_INSTALL/bin:$PATH"
fi

# Run the build
deno task build
