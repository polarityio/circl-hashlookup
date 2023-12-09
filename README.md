# Polarity CIRCL Hash Lookup Integration

The Polarity - CIRCL Hash lookup integration searches the CIRCL public hash lookup API which compares hash values against a database of known files.  The integration supports lookups of MD5, SHA1, and SHA256 hashes.

The CIRCL Hash lookup service includes hashes from:

* Common Windows 10 and Windows 11 build (French, Dutch, German, UK, US)
* NIST NSRL - All RDS hash sets including current, modern, android, iOS and legacy + SHA256 mapping.
* Ubuntu packages distribution
* CentOS core OS distribution
* Fedora project EPEL repository
* Kali linux packages distribution
* OpenSUSE distribution packages
* OpenBSD binary tar.gz distribution
* CDNJS
* Snap public repository


| ![](assets/riot.png) |![](assets/tor.png)|
|---|---|
|*RIOT IP Address* |*Internet Scanner IP*|


| ![](assets/cve.png) |![](assets/community.png)|
|---|---|
|*CVE* |*Community API Result*|


To learn more about CIRCL Hash Lookup please see https://www.circl.lu/services/hashlookup

## CIRCL Has Lookup Trust Level

The CIRCL Hash Lookup service includes a Trust Level.  The scale of the trust level is between 0 and 100. 50 means that CIRCL does not have any opinion on the file. If the score is below 50, CIRCL has less trust in the legitimacy of the file. If the file's trust score is above 50, it appears in multiple sources and has an improved trust.

## CIRCL Hash Lookup Integration Options

### Show Hashes that are Not Found

If checked, the integration will return a 'Not Found' result for hashes that are not found in the CIRCL hash lookup service

## Installation Instructions

Installation instructions for integrations are provided on the [PolarityIO GitHub Page](https://polarityio.github.io/).

## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see:

https://polarity.io/
