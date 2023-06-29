---
title: Ecedehey - Fun with WebCrypto
excerpt: Using WebCrypto I've created self-contained little HTML files that can perform key exchange and encryption
date: 2023-06-29 19:35:12
tags:
- javascript
- cryptography
- just-for-fun
---

## Introduction

Idea: Embedding code, that can perform cryptographic operations, together with private keys.

Use case: You're next to your colleague, and want to send something secret over Slack.

## Try it

You can try it on [palmenhq.dev/create-ecedehey.html](https://palmenhq.dev/create-ecedehey.html). The code is available on [github.com/palmenhq/ecedehey](https://github.com/palmenhq/ecedehey). 

## How it works

The concept is simple; An HTML file generates private keys, that are embedded into other HTML files (let's call them private key HTML files). These private key HTML files can encrypt and decrypt content performing an asynchronous ECDH. The idea struck me when I found out that filesystem-served (`file://`) files are considered a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) in the browsers. The WebCrypto API is only available in secure contexts.

These are the steps that are taken in Ecedehey to encrypt and then decrypt something:

1. Alice and Bob generate a new Secret (private) Key HTML File (SKHF) each, which both contain a private/Secret Key (SK)
2. With the help of his SKHF, Bob sends his Public Key (PK) to Alice in the form of a Json Web Key (JWK)
3. Alice opens Bob's PK in her SKHF, which uses it to perform an Elliptic Curve Diffie-Hellman (ECDH) key derivation, giving her the Symmetric Encryption Key (SEK)
4. Still using the SKHF, she uses the SEK to encrypt file F (using AES-256-GCM), and gets the result in the shape of a Json Web Encryption (JWE), and her own PK, which are serialized into a "ecdhmsg" file (which is just a cool name for transporting the JSON message)
5. Alice sends the ecdhmsg file to Bob (safely via an insecure medium)
6. Bob opens the ecdhmsg file using his SKHF. As the ecdhmsg contains Alice's PK, Bob's SKHF can derive the same SEK, and thus decrypt the file F 🥳 

Sounds great - and very straightforward, yeah? Well, if you're not familiar with asymmetric cryptography it may seem messy - but jokes aside, I think this is a pretty standard procedure in asymmetrical cryptography. Sometimes another Key Derivation Function (KDF) is used, but I think this should be fine.

### Caveats

*So can you use this for production?* **NO!** Please don't. This was a fun experiment from my end, nothing too serious.

*So how insecure is it, to be precise?* Well, I think the cryptographic bits should be fine, as they are mostly handled by the browser - and I sure hope the bigtech™ browser vendor companies know how to get cryptography right. The main problem I can think of lies within how the keys are stored - in plain text on your disk. Any security expert will have a small heart attack if you tell them that's your way of managing cryptographic keys. That being said, there might be other issues I've missed. If you find any - feel free to put an issue on GitHub ✨
