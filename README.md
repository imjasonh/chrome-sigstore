# Auto-close Sigstore and Chainguard auth windows

# [Install here](https://chrome.google.com/webstore/detail/sigstore-close-post-auth/incpcifganmpehaiplhjlfphaflbkdoj)

The repo implements a Chrome extension to automatically close browser tabs opened by Sigstore's keyless signing flow, and similarly Chainguard's OIDC auth refresh flows.

When you use [`cosign sign`](https://github.com/sigstore/cosign/blob/main/doc/cosign_sign.md) or [`gitsign`](https://github.com/sigstore/gitsign/), these tools take you through an OAuth flow, finally redirecting you to an "Auth successful" page. There are lots of things you can do to streamline this, but the final page remains open due to security limitations in the browser (windows aren't allowed to close themselves).

Similarly, Chainguard's [`chainctl auth login`](https://edu.chainguard.dev/chainguard/chainctl/chainctl-docs/chainctl_auth_login/) command pops up a browser to reauthenticate, and leaves a crufty window in its wake upon completion.

This Chrome extension takes care of cleaning up the cruft, and auto-closes these windows when they're found.

Auto-closing the window doesn't impact the security of the Fulcio certificate or signatures.

To get the best experience with `gitsign`, [configure](https://github.com/sigstore/gitsign/#configuration) the identity provider you want to use. For example:

```
git config --global gitsign.connectorID https://accounts.google.com
```

To get the best experience with `chainctl`, configure the identity provider you want to use. For example:

```
chainctl config set default.social-login google-oauth2
```
