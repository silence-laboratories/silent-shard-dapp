// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadLottieJson = async (name: string) => {
  const data = await fetch(`/lottie/${name}.json`);
  if (data && data.ok) return data.json();
  return null;
};
