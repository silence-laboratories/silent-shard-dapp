// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

const parseSemverAsArray = (version: string) => {
  const parts = version.split('-');
  if (parts.length > 1) {
    return [...parts[0].split('.'), parts[1].split('.')[1]];
  } else return parts[0].split('.');
};

export const compareVersions = (version1: string, version2: string): number => {
  const parts1 = parseSemverAsArray(version1);
  const parts2 = parseSemverAsArray(version2);

  const minLength = Math.min(parts1.length, parts2.length);

  for (let i = 0; i < minLength; i++) {
    if (parts1[i] < parts2[i]) {
      return -1;
    } else if (parts1[i] > parts2[i]) {
      return 1;
    }
  }

  if (parts1.length < parts2.length) {
    return -1;
  } else if (parts1.length > parts2.length) {
    return 1;
  }

  return 0;
};
