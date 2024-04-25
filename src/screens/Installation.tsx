// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { AnalyticEvent, EventName, EventScreen, trackAnalyticEvent } from '@/api/analytic';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import TermAndPolicy from '@/components/TermAndPolicy';
import { Button } from '@/components/ui/button';

interface InstallationProps {
  onConnectMmClick: () => Promise<void>;
}
let isNewSession = true;
const Installation: React.FC<InstallationProps> = ({ onConnectMmClick }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  if (isNewSession) {
    trackAnalyticEvent(
      EventName.new_page_visit,
      new AnalyticEvent().setScreen(EventScreen.connect_metamask)
    );
    isNewSession = false;
    const toId = setTimeout(() => {
      isNewSession = true;
      clearTimeout(toId);
    }, 30 * 60 * 1000);
  }

  return (
    <div>
      <div className={`flex flex-col justify-center items-center`}>
        <Layout className="h-max">
          <div className="flex items-center justify-between mt-4">
            <div className="h2-bold text-white-primary">Connect MetaMask Extension</div>
            <a href="http://silencelaboratories.com/snap" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.25 11.625C2.25 6.44782 6.44782 2.25 11.625 2.25C16.8022 2.25 21 6.44782 21 11.625C21 16.8022 16.8022 21 11.625 21C6.44782 21 2.25 16.8022 2.25 11.625ZM11.625 3.75C7.27624 3.75 3.75 7.27624 3.75 11.625C3.75 15.9738 7.27624 19.5 11.625 19.5C15.9738 19.5 19.5 15.9738 19.5 11.625C19.5 7.27624 15.9738 3.75 11.625 3.75ZM9.5625 10.3125C9.5625 9.89829 9.89829 9.5625 10.3125 9.5625H11.8125C12.2267 9.5625 12.5625 9.89829 12.5625 10.3125V15.1875H13.875C14.2892 15.1875 14.625 15.5233 14.625 15.9375C14.625 16.3517 14.2892 16.6875 13.875 16.6875H9.75C9.33579 16.6875 9 16.3517 9 15.9375C9 15.5233 9.33579 15.1875 9.75 15.1875H11.0625V11.0625H10.3125C9.89829 11.0625 9.5625 10.7267 9.5625 10.3125Z"
                  fill="#867DFC"
                />
                <path
                  d="M11.625 6.09375C11.384 6.09375 11.1483 6.16523 10.9479 6.29915C10.7475 6.43306 10.5913 6.62341 10.499 6.8461C10.4068 7.0688 10.3826 7.31385 10.4297 7.55027C10.4767 7.78668 10.5928 8.00384 10.7632 8.17429C10.9337 8.34473 11.1508 8.46081 11.3872 8.50783C11.6236 8.55486 11.8687 8.53072 12.0914 8.43848C12.3141 8.34623 12.5044 8.19002 12.6384 7.9896C12.7723 7.78918 12.8438 7.55355 12.8438 7.3125C12.8438 6.98927 12.7153 6.67927 12.4868 6.45071C12.2582 6.22215 11.9482 6.09375 11.625 6.09375Z"
                  fill="#867DFC"
                />
              </svg>
            </a>
          </div>
          <p className="b2-regular text-[#B6BAC3] mt-3">
            Link your MetaMask wallet with Silent Shard Snap to begin.
          </p>
          <div className="b2-regular p-2 flex items-start rounded-[8px] border bg-[rgba(96,154,250,0.1)] border-[#1e55af] text-[#BFD7FE] my-6">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 24"
              fill="none">
              <path
                d="M8 1.75C4.55375 1.75 1.75 4.55375 1.75 8C1.75 11.4462 4.55375 14.25 8 14.25C11.4462 14.25 14.25 11.4462 14.25 8C14.25 4.55375 11.4462 1.75 8 1.75ZM8 4.3125C8.1607 4.3125 8.31779 4.36015 8.4514 4.44943C8.58502 4.53871 8.68916 4.6656 8.75065 4.81407C8.81215 4.96253 8.82824 5.1259 8.79689 5.28351C8.76554 5.44112 8.68815 5.58589 8.57452 5.69952C8.46089 5.81315 8.31612 5.89054 8.15851 5.92189C8.0009 5.95324 7.83753 5.93715 7.68907 5.87565C7.5406 5.81416 7.41371 5.71002 7.32443 5.5764C7.23515 5.44279 7.1875 5.2857 7.1875 5.125C7.1875 4.90951 7.2731 4.70285 7.42548 4.55048C7.57785 4.3981 7.78451 4.3125 8 4.3125ZM9.5 11.375H6.75C6.61739 11.375 6.49021 11.3223 6.39645 11.2286C6.30268 11.1348 6.25 11.0076 6.25 10.875C6.25 10.7424 6.30268 10.6152 6.39645 10.5214C6.49021 10.4277 6.61739 10.375 6.75 10.375H7.625V7.625H7.125C6.99239 7.625 6.86521 7.57232 6.77145 7.47855C6.67768 7.38479 6.625 7.25761 6.625 7.125C6.625 6.99239 6.67768 6.86521 6.77145 6.77145C6.86521 6.67768 6.99239 6.625 7.125 6.625H8.125C8.25761 6.625 8.38479 6.67768 8.47855 6.77145C8.57232 6.86521 8.625 6.99239 8.625 7.125V10.375H9.5C9.63261 10.375 9.75979 10.4277 9.85355 10.5214C9.94732 10.6152 10 10.7424 10 10.875C10 11.0076 9.94732 11.1348 9.85355 11.2286C9.75979 11.3223 9.63261 11.375 9.5 11.375Z"
                fill="#609AFA"
              />
            </svg>
            By connecting, you will create a new Snaps account in your existing MetaMask extension
            as shown in the video below.
          </div>
          <div className="mb-3 flex flex-col justify-center items-center flex-1">
            <LazyLoadImage
              wrapperProps={{ style: { display: 'contents' } }}
              src="/v2/mmconnect.gif"
              alt="mmconnect"
              className="w-[554px] h-[254px] border rounded-[8px] border-gray-700"
            />
            <Button
              className="max-sm:p-8 w-full mt-8 h-10 bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active text-white-primary btn-lg whitespace-normal"
              onClick={async () => {
                setShowSpinner(true);
                await onConnectMmClick();
                setShowSpinner(false);
              }}
              disabled={showSpinner}>
              {showSpinner && <img src="./spinner.svg" className="h-full" />}
              Connect MetaMask
            </Button>
          </div>
        </Layout>
        <div className="mt-6 text-[#B6BAC3] text-center label-regular w-[90vw] lg:w-max">
          <Footer />
          <TermAndPolicy />
        </div>
      </div>
    </div>
  );
};

export default Installation;
