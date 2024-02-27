// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

export const compareVersions = (version1: string, version2: string): number => {
  const parts1 = version1.split('.').map(Number);
  const parts2 = version2.split('.').map(Number);

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
