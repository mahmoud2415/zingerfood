#!/usr/bin/env python3
"""Prevent the obsolete one-time builder from overwriting the maintained catalog."""

raise SystemExit(
    "This legacy builder contains an outdated menu snapshot. "
    "Update src/data/initialMenu.ts directly and run npm run build."
)
