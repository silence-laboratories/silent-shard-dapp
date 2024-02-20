// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import * as React from 'react';

import { cn } from '@/utils/ui';

import { Button } from './ui/button';
import { Progress } from './ui/progress';

export interface StepProps {
  onGoingBackClick?: () => void;
  progressStep: number;
}

interface StepNavigatorProps {
  children: React.ReactNode;
  className?: string;
  step?: StepProps;
  overlay?: boolean;
  disabled?: boolean;
}

const Layout: React.FunctionComponent<StepNavigatorProps> = ({
  className,
  children,
  step,
  overlay,
  disabled,
}) => {
  return step ? (
    <>
      <div
        className={cn(
          'relative flex flex-col justify-center py-6 px-10 border rounded-[8px] border-gray-700 w-[92vw] lg:w-[52.75vw] m-auto bg-black max-w-[650px]',
          className
        )}>
        <div className="absolute w-full top-0 right-0">
          <Progress
            className="w-[99.5%]"
            value={step.progressStep * 25}
            style={{ height: '4px' }}
          />
        </div>
        <Button
          className="rounded-full bg-gray-custom min-w-max aspect-square"
          size="icon"
          disabled={disabled}
          onClick={() => {
            if (step.onGoingBackClick) {
              step.onGoingBackClick();
            }
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1705 4.4545C16.6098 4.89384 16.6098 5.60616 16.1705 6.0455L10.216 12L16.1705 17.9545C16.6098 18.3938 16.6098 19.1062 16.1705 19.5455C15.7312 19.9848 15.0188 19.9848 14.5795 19.5455L7.8295 12.7955C7.39017 12.3562 7.39017 11.6438 7.8295 11.2045L14.5795 4.4545C15.0188 4.01517 15.7312 4.01517 16.1705 4.4545Z"
              fill="#B1BBC8"
            />
          </svg>
        </Button>
        {children}
      </div>
    </>
  ) : (
    <div
      className={cn(
        'relative flex flex-col justify-center py-6 px-10 border rounded-[8px] border-gray-700  w-[92vw] lg:w-[52.75vw] m-auto bg-black max-w-[650px]',
        className
      )}>
      {overlay && <div className="absolute z-50 inset-0 bg-black bg-opacity-50"></div>}
      {children}
    </div>
  );
};

export default Layout;
