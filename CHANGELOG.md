# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
- Fix the time inconsistencies caused across devices due to timezone [`#21`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/21)

## [1.2.9]
### Added
- Add backup Mixpanel event [`#19`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/19)
- Add `runBackup` rpc method [`#17`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/17)

## [1.2.8]
### Added
- Set snap version after update [`#14`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/14)
- Add deep link QR code for mobile app installation [`#8`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/8), [`#10`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/10), [`#12`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/12)

### Changed
- Update connect metamask and backup screens UI [`#13`](https://github.com-sl/silence-laboratories/silent-shard-dapp/pull/13)

## [1.2.7] - 2024-01-12
### Added
- Integrate MixPanel events to the Dapp
- Implement Dapp UI for Re-pairing flow [`35dabbf`](https://github.com-sl/silence-laboratories/silent-shard-dapp/commit/35dabbfa3114183049f72282007c24e501dfba23)
- [shadcn/ui](https://ui.shadcn.com/) A customizable and open source UI library that is built up on [TailwindCSS](https://tailwindcss.com/), Typescript and supports all modern Javascript package management tool.
- [craco](https://craco.js.org/) A build tool allows to get all of the benefits of Create React App without ejecting. Why do we need this? Its required to integrate `shadcn/ui` with `ReactJs`.
- `Linter/Prettier` setup to keep the codebase has same coding and formatting rule. Add [husky](https://typicode.github.io/husky/getting-started.html) to automatically lint and format the code by git commits.
 
### Changed
- New UI for https://snap.silencelaboratories.com/
- Codebase structure: Add `api`, `components/ui`


 
