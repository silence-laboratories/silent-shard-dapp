// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import React from 'react';

import { AnalyticEvent, EventName, EventPage, trackAnalyticEvent } from '@/api/analytic';

export default function Footer() {
  return (
    <div className="text-[#B6BAC3] text-center label-regular">
      This Snap is powered by{' '}
      <a
        className="underline text-indigo-custom label-bold"
        href="https://silencelaboratories.com/silent-shard"
        onClick={() => {
          trackAnalyticEvent(
            EventName.view_website_page,
            new AnalyticEvent().setPage(EventPage.silent_shard)
          );
        }}
        target="_blank"
        rel="noreferrer">
        Silent Shard Two Party SDK
      </a>{' '}
      from{' '}
      <a
        className="underline text-indigo-custom label-bold"
        href="https://www.silencelaboratories.com"
        onClick={() => {
          trackAnalyticEvent(
            EventName.view_website_page,
            new AnalyticEvent().setPage(EventPage.silence_laboratories)
          );
        }}
        target="_blank"
        rel="noreferrer">
        {' '}
        Silence Laboratories.
      </a>
    </div>
  );
}
