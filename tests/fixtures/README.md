# Audio fixture

`audio-tone.mp3` is a generated 1-second, 440 Hz sine wave (6,572 bytes), not
speech, learner data or a production recording. It exercises actual MP3 parsing,
checksums, cache storage, byte ranges and browser decoding. Generate it with:

```sh
ffmpeg -hide_banner -loglevel error -f lavfi -i sine=frequency=440:duration=1 -ar 24000 -ac 1 -b:a 48k -map_metadata -1 audio-tone.mp3
```

The tests map it to synthetic manifests. Never publish this fixture as lesson
audio; it provides no evidence about pronunciation or translation quality.
