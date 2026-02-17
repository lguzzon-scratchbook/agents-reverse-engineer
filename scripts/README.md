# Scripts

## Terminal Demo Recordings (VHS)

Animated terminal GIFs are recorded with [VHS](https://github.com/charmbracelet/vhs). Each `.tape` file is a script that drives a terminal session — typing commands, pressing keys, and capturing the output as a GIF.

### Prerequisites

Install VHS, ffmpeg, and ttyd (all available as standalone binaries in `~/.local/bin`):

```bash
# VHS
curl -fsSL "https://github.com/charmbracelet/vhs/releases/latest/download/vhs_$(curl -s https://api.github.com/repos/charmbracelet/vhs/releases/latest | grep tag_name | cut -d'"' -f4 | sed 's/v//')_Linux_x86_64.tar.gz" -o /tmp/vhs.tar.gz
tar -xzf /tmp/vhs.tar.gz -C /tmp/ && cp /tmp/vhs_*/vhs ~/.local/bin/

# ffmpeg (static build)
curl -fsSL "https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz" -o /tmp/ffmpeg.tar.xz
tar -xf /tmp/ffmpeg.tar.xz -C /tmp/ && cp /tmp/ffmpeg-*-amd64-static/ffmpeg ~/.local/bin/

# ttyd
curl -fsSL "https://github.com/tsl0922/ttyd/releases/latest/download/ttyd.x86_64" -o ~/.local/bin/ttyd
chmod +x ~/.local/bin/ttyd
```

### Setup

Build the project first, then set up the fake npx symlink:

```bash
npm run build
mkdir -p /tmp/are-demo-bin
ln -sf "$(pwd)/scripts/fake-npx.sh" /tmp/are-demo-bin/npx
```

### Recording

```bash
export PATH="$HOME/.local/bin:$PATH"
vhs scripts/demo-install.tape
```

Output goes to `assets/demo-install.gif`.

### Tapes

| Tape | Output | Description |
|------|--------|-------------|
| `demo-install.tape` | `assets/demo-install.gif` | Interactive installer: npx prompt, runtime + location selection, results |

### Helpers

| File | Purpose |
|------|---------|
| `fake-npx.sh` | Intercepts `npx` in PATH so tape can show the real command while running the local build. Simulates the npx "Ok to proceed?" prompt. |

### Adding New Demos

1. Create a new `.tape` file (use `demo-install.tape` as a template)
2. Output to `assets/demo-<name>.gif`
3. If the tape needs to fake a CLI command, add a helper script and symlink it into `/tmp/are-demo-bin/`
4. Add the tape to the table above
5. Run `vhs scripts/demo-<name>.tape` to generate

### YT Shorts

For vertical video demos (1080x1920), use these VHS settings:

```tape
Set Width 1080
Set Height 1920
Set FontSize 22
Set Framerate 30
```

Output as `.webm` or `.mp4` for upload (VHS supports both). Add `Output assets/short-<name>.webm` to the tape.
