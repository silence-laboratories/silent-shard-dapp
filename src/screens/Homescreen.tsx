// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { KeyringAccount } from '@metamask/keyring-api';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CONNECTION_REJECTED_UPDATE_SNAP_TOAST_MSG } from '@/api/error';
import Layout from '@/components/Layout';
import { ErrorToast } from '@/components/Toast/error';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { compareVersions } from '@/utils/metamask';

import { connectSnap, getKeyringClient } from '../api/snap';

interface HomescreenProps {
  onLogout: () => void;
  onSnapUpdate: () => Promise<void>;
  onMissingProvider: (error: unknown) => void;
  currentSnapVersion: string;
  latestSnapVersion: string;
  account: KeyringAccount;
  provider: any;
}
const Homescreen: React.FC<HomescreenProps> = ({
  onLogout,
  onSnapUpdate,
  onMissingProvider,
  account,
  currentSnapVersion,
  latestSnapVersion,
  provider,
}) => {
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const isUpdateAvailable =
      latestSnapVersion && currentSnapVersion
        ? compareVersions(latestSnapVersion, currentSnapVersion) > 0
        : false;

    setShowUpdateBanner(isUpdateAvailable);
  }, [latestSnapVersion, currentSnapVersion]);

  return (
    <div className="animate__animated animate__slideInUp animate__faster">
      {!showRemoveSuccess ? (
        <Layout overlay={showOverlay} className="border-none bg-transparent h-max py-0">
          {showSuccessBanner && (
            <div className="mb-6 flex-none relative flex flex-col justify-center p-4 border rounded-[8px] bg-[#08170E] border-[#166533] w-full text-[#BBF7D1]">
              <svg
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => {
                  setShowSuccessBanner(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                  d="M9.06193 7.99935L12.0307 5.0306C12.1716 4.88995 12.2508 4.69909 12.251 4.50001C12.2512 4.30093 12.1723 4.10993 12.0316 3.96904C11.891 3.82814 11.7001 3.74889 11.501 3.74871C11.3019 3.74853 11.1109 3.82745 10.9701 3.9681L8.0013 6.93685L5.03255 3.9681C4.89165 3.8272 4.70056 3.74805 4.5013 3.74805C4.30204 3.74805 4.11095 3.8272 3.97005 3.9681C3.82915 4.10899 3.75 4.30009 3.75 4.49935C3.75 4.69861 3.82915 4.8897 3.97005 5.0306L6.9388 7.99935L3.97005 10.9681C3.82915 11.109 3.75 11.3001 3.75 11.4993C3.75 11.6986 3.82915 11.8897 3.97005 12.0306C4.11095 12.1715 4.30204 12.2506 4.5013 12.2506C4.70056 12.2506 4.89165 12.1715 5.03255 12.0306L8.0013 9.06185L10.9701 12.0306C11.1109 12.1715 11.302 12.2506 11.5013 12.2506C11.7006 12.2506 11.8917 12.1715 12.0326 12.0306C12.1734 11.8897 12.2526 11.6986 12.2526 11.4993C12.2526 11.3001 12.1734 11.109 12.0326 10.9681L9.06193 7.99935Z"
                  fill="#4ADE80"
                />
              </svg>
              <div className="full-w full-h flex flex-col justify-center items-center">
                <svg
                  className="my-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none">
                  <path
                    d="M32 6C17.6637 6 6 17.6637 6 32C6 46.3363 17.6637 58 32 58C46.3363 58 58 46.3363 58 32C58 17.6637 46.3363 6 32 6ZM45.5312 23.2862L28.7313 43.2863C28.547 43.5058 28.3177 43.6831 28.0589 43.8062C27.8001 43.9294 27.5178 43.9955 27.2313 44H27.1975C26.9172 43.9999 26.64 43.9409 26.384 43.8267C26.1279 43.7126 25.8987 43.5459 25.7113 43.3375L18.5112 35.3375C18.3284 35.1436 18.1862 34.915 18.0929 34.6653C17.9996 34.4156 17.9572 34.1498 17.9681 33.8835C17.9791 33.6171 18.0431 33.3557 18.1565 33.1145C18.27 32.8733 18.4305 32.6571 18.6286 32.4788C18.8267 32.3005 19.0585 32.1636 19.3103 32.0762C19.5621 31.9887 19.8288 31.9525 20.0948 31.9696C20.3608 31.9867 20.6207 32.0568 20.8592 32.1758C21.0978 32.2948 21.3101 32.4603 21.4837 32.6625L27.145 38.9525L42.4688 20.7138C42.8125 20.3163 43.2988 20.0702 43.8226 20.0284C44.3463 19.9867 44.8655 20.1528 45.2678 20.4907C45.6701 20.8287 45.9233 21.3114 45.9726 21.8345C46.0219 22.3576 45.8634 22.8791 45.5312 23.2862Z"
                    fill="#4ADE80"
                  />
                </svg>
                <div className="text-center">Your Silent Account is ready!</div>
              </div>
            </div>
          )}

          {showUpdateBanner && (
            <div className="mb-6 flex flex-col justify-center py-6 px-10 border rounded-[8px] bg-[#110E25] border-[#745EF6] w-full">
              <div className="text-white-primary b1-bold">
                Update available! ({latestSnapVersion})
              </div>
              <div className="text-[#D8DBDF] b2-regular mt-3 mb-6">
                You are currently using older version of Silent Shard Snap. Update to the latest
                version for enhanced performance.
              </div>
              <Button
                className="bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active w-2/3 self-center text-white-primary btn-sm"
                onClick={async () => {
                  try {
                    await connectSnap(latestSnapVersion, provider);
                    await onSnapUpdate();
                    setShowUpdateBanner(false);
                  } catch (error) {
                    if (error instanceof Error) {
                      onMissingProvider(error);
                      console.error(error.message);
                    } else {
                      const rpcError = error as ProviderRpcError;
                      if (rpcError.code === 4001)
                        toast(<ErrorToast msg={CONNECTION_REJECTED_UPDATE_SNAP_TOAST_MSG} />);
                    }
                  }
                }}>
                Update
              </Button>
            </div>
          )}

          {showUpdateSuccess && (
            <div
              className="mb-6 relative flex items-center p-2 border rounded-[8px] border-[#166533] w-full text-[#BBF7D1]"
              style={{ background: 'rgba(74, 222, 128, 0.10)' }}>
              <div className="flex flex-1 items-center b2-regular">
                <svg
                  className="mr-1 mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none">
                  <path
                    d="M8 2C4.41594 2 1.5 4.91594 1.5 8.5C1.5 12.0841 4.41594 15 8 15C11.5841 15 14.5 12.0841 14.5 8.5C14.5 4.91594 11.5841 2 8 2ZM11.3828 6.32156L7.18281 11.3216C7.13674 11.3764 7.07941 11.4208 7.01471 11.4516C6.95001 11.4823 6.87945 11.4989 6.80781 11.5H6.79938C6.72929 11.5 6.66 11.4852 6.59599 11.4567C6.53198 11.4282 6.47468 11.3865 6.42781 11.3344L4.62781 9.33438C4.5821 9.28589 4.54654 9.22876 4.52322 9.16633C4.4999 9.10391 4.4893 9.03745 4.49203 8.97087C4.49477 8.90429 4.51078 8.83892 4.53914 8.77862C4.56749 8.71831 4.60761 8.66429 4.65715 8.61971C4.70668 8.57514 4.76463 8.54091 4.82757 8.51905C4.89052 8.49719 4.95721 8.48813 5.02371 8.4924C5.09021 8.49668 5.15518 8.51421 5.21481 8.54396C5.27444 8.5737 5.32752 8.61507 5.37094 8.66562L6.78625 10.2381L10.6172 5.67844C10.7031 5.57909 10.8247 5.51754 10.9556 5.50711C11.0866 5.49668 11.2164 5.53819 11.317 5.62268C11.4175 5.70717 11.4808 5.82784 11.4931 5.95862C11.5055 6.0894 11.4658 6.21977 11.3828 6.32156Z"
                    fill="#4ADE80"
                  />
                </svg>
                Snap updated successfully!
              </div>
              <svg
                className="cursor-pointer"
                onClick={() => {
                  setShowUpdateSuccess(false);
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none">
                <path
                  d="M9.06144 8.49935L12.0302 5.5306C12.1711 5.38995 12.2503 5.19909 12.2505 5.00001C12.2507 4.80093 12.1718 4.60993 12.0311 4.46904C11.8905 4.32814 11.6996 4.24889 11.5005 4.24871C11.3015 4.24853 11.1105 4.32745 10.9696 4.4681L8.00081 7.43685L5.03206 4.4681C4.89117 4.3272 4.70007 4.24805 4.50081 4.24805C4.30156 4.24805 4.11046 4.3272 3.96956 4.4681C3.82867 4.60899 3.74951 4.80009 3.74951 4.99935C3.74951 5.19861 3.82867 5.3897 3.96956 5.5306L6.93831 8.49935L3.96956 11.4681C3.82867 11.609 3.74951 11.8001 3.74951 11.9993C3.74951 12.1986 3.82867 12.3897 3.96956 12.5306C4.11046 12.6715 4.30156 12.7506 4.50081 12.7506C4.70007 12.7506 4.89117 12.6715 5.03206 12.5306L8.00081 9.56185L10.9696 12.5306C11.1105 12.6715 11.3016 12.7506 11.5008 12.7506C11.7001 12.7506 11.8912 12.6715 12.0321 12.5306C12.173 12.3897 12.2521 12.1986 12.2521 11.9993C12.2521 11.8001 12.173 11.609 12.0321 11.4681L9.06144 8.49935Z"
                  fill="#4ADE80"
                />
              </svg>
            </div>
          )}
          <div
            className="mb-3 flex flex-col justify-center p-4 border rounded-[8px] bg-black"
            style={{ border: '1px solid #23272E', padding: '32px 40px' }}>
            <div className="flex flex-col space-y-1 md:flex-row md:space-y-0 flex-wrap items-center">
              <div className="mr-3 h-[48px] w-[48px] rounded-full aspect-square bg-[#181625] flex justify-center">
                <svg
                  className="self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.58732 5.80487H22.5984C22.7999 5.80478 23.0012 5.81756 23.2011 5.84315C23.1334 5.36757 22.97 4.91064 22.7209 4.4999C22.4718 4.08917 22.1421 3.73313 21.7516 3.45327C21.3612 3.1734 20.9181 2.9755 20.4491 2.8715C19.9802 2.76749 19.495 2.75954 19.0228 2.84811L5.39572 5.17462C5.20928 5.20319 5.0208 5.23491 4.83208 5.27012H4.82015C4.73687 5.28605 4.65445 5.30489 4.57303 5.32657C2.52494 5.84199 1.92539 7.69905 1.92539 8.82366V10.1217C1.90768 10.2626 1.89859 10.4052 1.89844 10.5487V20.8987C1.89944 21.8134 2.26324 22.6903 2.91002 23.3371C3.55681 23.9839 4.43375 24.3477 5.34844 24.3487H22.5984C23.5131 24.3477 24.3901 23.9839 25.0369 23.3371C25.6836 22.6903 26.0474 21.8134 26.0484 20.8987V10.5487C26.0474 9.63397 25.6836 8.75703 25.0369 8.11025C24.3901 7.46346 23.5131 7.09966 22.5984 7.09866H8.82539C7.91274 7.09866 7.81273 5.99258 8.58732 5.80487ZM20.0379 17.4487C19.6967 17.4487 19.3632 17.3475 19.0795 17.1579C18.7959 16.9684 18.5748 16.699 18.4442 16.3838C18.3136 16.0686 18.2795 15.7217 18.346 15.3871C18.4126 15.0525 18.5769 14.7451 18.8181 14.5039C19.0594 14.2627 19.3667 14.0984 19.7014 14.0318C20.036 13.9652 20.3828 13.9994 20.698 14.13C21.0132 14.2605 21.2826 14.4816 21.4722 14.7653C21.6617 15.049 21.7629 15.3825 21.7629 15.7237C21.7629 16.1812 21.5812 16.6199 21.2577 16.9434C20.9342 17.2669 20.4954 17.4487 20.0379 17.4487Z"
                    fill="#A2A3FF"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <Popover>
                  <PopoverTrigger>
                    <div
                      className="flex items-center"
                      onClick={async () => {
                        navigator.clipboard.writeText(account.address);
                      }}>
                      <span className="mr-1 text-[#F7F8F8] b1-bold">
                        {account.address.slice(0, 5)}
                        {'...'}
                        {account.address.slice(account.address.length - 5, account.address.length)}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.37315 1.75L4.375 1.75H12.8125L12.8143 1.75C13.5591 1.75212 14.2728 2.04893 14.7994 2.57558C15.3261 3.10224 15.6229 3.81592 15.625 4.56072C15.625 4.56565 15.625 4.57059 15.6249 4.57552L15.6186 4.875H15.8984C17.4733 4.875 18.75 6.15169 18.75 7.72656V16.3984C18.75 17.9733 17.4733 19.25 15.8984 19.25H7.22656C5.65169 19.25 4.375 17.9733 4.375 16.3984V16.125H4.0625L4.06072 16.125C3.31592 16.1229 2.60224 15.8261 2.07558 15.2994C1.54893 14.7728 1.25212 14.0591 1.25 13.3143L1.25 13.3125V4.875L1.25 4.87315C1.25245 4.04559 1.58228 3.25263 2.16745 2.66745C2.75263 2.08228 3.54559 1.75245 4.37315 1.75ZM5.625 16.3984C5.625 17.283 6.34204 18 7.22656 18H15.8984C16.783 18 17.5 17.283 17.5 16.3984V7.72656C17.5 6.84204 16.783 6.125 15.8984 6.125H14.9826C14.9813 6.125 14.9801 6.125 14.9789 6.125H7.22656C6.34204 6.125 5.625 6.84204 5.625 7.72656V16.3984ZM14.3684 4.875H7.22656C5.65169 4.875 4.375 6.15169 4.375 7.72656V14.875H4.06351C3.64928 14.8736 3.25239 14.7085 2.95947 14.4155C2.66656 14.1226 2.50139 13.7258 2.5 13.3115V4.87599C2.50169 4.37898 2.69988 3.9028 3.05134 3.55134C3.4028 3.19988 3.87898 3.00169 4.37599 3H12.8115C13.2258 3.00139 13.6226 3.16656 13.9155 3.45947C14.207 3.75098 14.372 4.14545 14.375 4.55751L14.3684 4.875Z"
                          fill="#ECEEF2"
                        />
                      </svg>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    side="right"
                    className="flex justify-center w-18 p-1 b2-md">
                    Copied!
                  </PopoverContent>
                </Popover>
                <div className="flex text-[#EDEEF1] justify-center md:justify-start">
                  <img className="mr-1" src="/v2/mmicon.svg" alt="mmicon" />
                  <div className="b2-regular">MetaMask</div>
                </div>
              </div>
              <div className="ml-auto"></div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                  <Button className="bg-gray-custom rounded-full w-8 h-8" size="icon">
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex justify-center w-18 p-1 bg-[#111112] border-[#434E61] border-[1px]">
                  <div className="flex flex-col gap-2 bg-[#111112] text-white-primary p-2">
                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#1E1F25] rounded-[8px] cursor-pointer p-2"
                      onClick={() => {
                        window.open(
                          'https://www.silencelaboratories.com/silent-shard-snap',
                          '_blank'
                        );
                      }}>
                      <div className="flex rounded-full p-2 mr-2" style={{ background: '#23272E' }}>
                        <svg
                          className="self-center"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.875 9.6875C1.875 5.37318 5.37318 1.875 9.6875 1.875C14.0018 1.875 17.5 5.37318 17.5 9.6875C17.5 14.0018 14.0018 17.5 9.6875 17.5C5.37318 17.5 1.875 14.0018 1.875 9.6875ZM9.6875 3.125C6.06354 3.125 3.125 6.06354 3.125 9.6875C3.125 13.3115 6.06354 16.25 9.6875 16.25C13.3115 16.25 16.25 13.3115 16.25 9.6875C16.25 6.06354 13.3115 3.125 9.6875 3.125ZM7.96875 8.59375C7.96875 8.24857 8.24857 7.96875 8.59375 7.96875H9.84375C10.1889 7.96875 10.4688 8.24857 10.4688 8.59375V12.6562H11.5625C11.9077 12.6562 12.1875 12.9361 12.1875 13.2812C12.1875 13.6264 11.9077 13.9062 11.5625 13.9062H8.125C7.77982 13.9062 7.5 13.6264 7.5 13.2812C7.5 12.9361 7.77982 12.6562 8.125 12.6562H9.21875V9.21875H8.59375C8.24857 9.21875 7.96875 8.93893 7.96875 8.59375Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M9.6875 5.07812C9.48663 5.07812 9.29027 5.13769 9.12325 5.24929C8.95623 5.36089 8.82606 5.51951 8.74918 5.70509C8.67231 5.89067 8.6522 6.09488 8.69139 6.29189C8.73058 6.4889 8.82731 6.66987 8.96934 6.81191C9.11138 6.95394 9.29235 7.05067 9.48936 7.08986C9.68637 7.12905 9.89058 7.10894 10.0762 7.03207C10.2617 6.95519 10.4204 6.82502 10.532 6.658C10.6436 6.49098 10.7031 6.29462 10.7031 6.09375C10.7031 5.82439 10.5961 5.56606 10.4057 5.37559C10.2152 5.18513 9.95686 5.07812 9.6875 5.07812Z"
                            fill="#F6F7F9"
                          />
                        </svg>
                      </div>
                      About Silent Shard Snap
                      <div className="flex-1"></div>
                    </div>
                    <Separator className="w-[248px] ml-3 my-1 bg-[#3A4252]" />

                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#1E1F25] rounded-[8px] cursor-pointer p-2"
                      onClick={() => {
                        window.open(
                          'https://www.silencelaboratories.com/silent-shard-snap#faq',
                          '_blank'
                        );
                      }}>
                      <div className="flex rounded-full p-2 mr-2" style={{ background: '#23272E' }}>
                        <svg
                          className="self-center"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none">
                          <path
                            d="M17.1836 15.8438H17.1524L17.1211 15.8398C17.0156 15.8281 16.9102 15.8047 16.8086 15.7617L14.5938 14.9766L14.5781 14.9688C14.5313 14.9492 14.4805 14.9375 14.4258 14.9375C14.375 14.9375 14.3281 14.9453 14.2813 14.9648C14.2305 14.9844 13.7422 15.168 13.2344 15.3086C12.957 15.3828 11.9961 15.6328 11.2266 15.6328C9.25392 15.6328 7.41017 14.875 6.03517 13.5C4.67189 12.1367 3.92189 10.3281 3.92189 8.40234C3.92189 7.91016 3.97657 7.41406 4.08204 6.93359C4.42579 5.34766 5.33595 3.90625 6.64064 2.87109C7.95704 1.82422 9.62892 1.25 11.3399 1.25C13.3789 1.25 15.2813 2.03125 16.6914 3.44531C18.0274 4.78516 18.7578 6.54297 18.75 8.40234C18.75 9.78516 18.3399 11.125 17.5664 12.2773L17.5469 12.3086C17.5313 12.3281 17.5195 12.3477 17.5039 12.3672C17.4844 12.3984 17.4727 12.4258 17.4649 12.4453L18.0781 14.6289C18.1016 14.7031 18.1133 14.7812 18.1211 14.8594V14.9063C18.1211 15.4219 17.6992 15.8438 17.1836 15.8438ZM15.0391 13.8086L16.7149 14.4023L16.2344 12.6875C16.1563 12.4023 16.2188 12.082 16.4258 11.7305L16.4297 11.7227C16.4649 11.668 16.5 11.6133 16.5391 11.5586C17.168 10.6172 17.5 9.52344 17.5 8.39453C17.5039 6.87109 16.9024 5.42578 15.8047 4.32422C14.6289 3.14844 13.043 2.5 11.3399 2.5C8.4297 2.5 5.88673 4.47656 5.29689 7.19922C5.21095 7.59375 5.16798 8 5.16798 8.40234C5.16798 11.6992 7.88282 14.3828 11.2227 14.3828C11.7109 14.3828 12.4336 14.2344 12.9024 14.1055C13.3633 13.9805 13.8203 13.8086 13.8399 13.8008C14.0274 13.7305 14.2227 13.6953 14.4258 13.6953C14.6328 13.6914 14.8399 13.7305 15.0391 13.8086Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M2.80865 18.75C2.5938 18.75 2.38677 18.6758 2.2188 18.543L2.20708 18.5352C1.94537 18.3164 1.82427 17.9688 1.89068 17.6367C2.00396 17.0547 2.23833 15.832 2.32427 15.3789C2.32427 15.3789 2.32427 15.3789 2.32427 15.375C1.67193 14.4063 1.30474 13.2734 1.25396 12.1094C1.20318 10.9414 1.48052 9.78516 2.04693 8.76172C2.2149 8.46094 2.5938 8.35156 2.89849 8.51953C3.19927 8.6875 3.30865 9.06641 3.14068 9.37109C2.20708 11.0508 2.28912 13.0859 3.36333 14.6836L3.36724 14.6875C3.51177 14.9063 3.64849 15.168 3.58208 15.4766C3.56646 15.5547 3.38677 16.4805 3.22662 17.3203L4.89458 16.668C5.19537 16.5508 5.5274 16.5547 5.82818 16.6797C6.53912 16.957 7.2813 17.1016 7.9688 17.1016C7.97271 17.1016 7.97271 17.1016 7.97662 17.1016C8.96099 17.1016 9.93365 16.8398 10.7852 16.3477C11.0821 16.1758 11.4649 16.2773 11.6407 16.5742C11.8126 16.8711 11.711 17.2539 11.4141 17.4297C10.3711 18.0352 9.18365 18.3516 7.98052 18.3516C7.97662 18.3516 7.97662 18.3516 7.97271 18.3516C7.12896 18.3516 6.23052 18.1758 5.37115 17.8398L5.35552 17.832L3.17193 18.6875C3.06255 18.7344 2.94537 18.7578 2.82427 18.7578C2.81255 18.75 2.81255 18.75 2.80865 18.75Z"
                            fill="#F6F7F9"
                          />
                        </svg>
                      </div>
                      FAQs
                      <div className="flex-1"></div>
                    </div>

                    <Separator className="w-[248px] ml-3 my-1 bg-[#3A4252]" />
                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#EF444433] rounded-[8px] cursor-pointer p-2"
                      onClick={async () => {
                        try {
                          setShowOverlay(true);
                          setOpen(false);
                          const client = getKeyringClient(provider);
                          const accounts = await client.listAccounts();
                          if (accounts.length > 0) await client.deleteAccount(accounts[0].id);
                          setShowOverlay(false);
                          setShowRemoveSuccess(true);
                        } catch (error: unknown) {
                          setShowOverlay(false);
                        }
                      }}>
                      <div
                        className="flex rounded-full p-2 mr-2"
                        style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
                        <svg
                          className="self-center"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.875 10C1.875 5.5142 5.5142 1.875 10 1.875C14.4858 1.875 18.125 5.5142 18.125 10C18.125 14.4858 14.4858 18.125 10 18.125C5.5142 18.125 1.875 14.4858 1.875 10ZM10 3.125C6.20455 3.125 3.125 6.20455 3.125 10C3.125 13.7954 6.20455 16.875 10 16.875C13.7954 16.875 16.875 13.7954 16.875 10C16.875 6.20455 13.7954 3.125 10 3.125Z"
                            fill="#F87171"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.25 10C6.25 9.65482 6.52982 9.375 6.875 9.375H13.125C13.4702 9.375 13.75 9.65482 13.75 10C13.75 10.3452 13.4702 10.625 13.125 10.625H6.875C6.52982 10.625 6.25 10.3452 6.25 10Z"
                            fill="#F87171"
                          />
                        </svg>
                      </div>

                      <span
                        className="b2-regular"
                        style={{
                          color: '#F87171',
                        }}>
                        Delete account
                      </span>
                      <div className="flex-1"></div>
                    </div>

                    <div className="grid grid-cols-3 items-center gap-4"></div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            className="my-3 flex flex-col justify-center px-10 py-6 border rounded-[8px] bg-black"
            style={{ border: '1px solid var(--Secondary-950, #23272E)' }}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}>
                  <div className="full-w text-start flex-1 text-white-primary b1-md">
                    What to do next?
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap lg:flex-nowrap mr-8">
                    <img
                      className="mx-2 h-[146px] w-[222px]"
                      src="/v2/what_next.gif"
                      alt="laptop"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div
            className="mt-3 mb-6 flex flex-wrap justify-between overflow-auto px-10 py-6 border rounded-[8px] bg-black"
            style={{ border: '1px solid var(--Secondary-950, #23272E)' }}>
            <div className="text-white-primary b1-regular">Reach us at</div>
            <div className="text-indigo-custom b1-bold">snap@silencelaboratories.com</div>
          </div>
          <div className="text-white-primary full-w flex flex-col items-center justify-center">
            <div className="text-[#B6BAC3] text-center label-regular">
              This Snap is powered by{' '}
              <a
                className="underline text-indigo-custom label-bold"
                href="https://www.silencelaboratories.com/silent-shard"
                target="_blank"
                rel="noreferrer">
                Silent Shard Two Party SDK
              </a>{' '}
              from{' '}
              <a
                className="underline text-indigo-custom label-bold"
                href="https://www.silencelaboratories.com"
                target="_blank"
                rel="noreferrer">
                {' '}
                Silence Laboratories.
              </a>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout className="w-[52.03vw] py-24 px-10">
          <div className="flex-1 flex flex-col justify-center items-center">
            <svg
              className="mb-8"
              xmlns="http://www.w3.org/2000/svg"
              width="88"
              height="88"
              viewBox="0 0 88 88"
              fill="none">
              <path
                d="M44 8.25C24.2877 8.25 8.25 24.2877 8.25 44C8.25 63.7123 24.2877 79.75 44 79.75C63.7123 79.75 79.75 63.7123 79.75 44C79.75 24.2877 63.7123 8.25 44 8.25ZM62.6055 32.0186L39.5055 59.5186C39.2521 59.8204 38.9368 60.0642 38.5809 60.2336C38.2251 60.4029 37.837 60.4937 37.443 60.5H37.3966C37.0111 60.4999 36.63 60.4187 36.2779 60.2618C35.9259 60.1048 35.6107 59.8756 35.353 59.5891L25.453 48.5891C25.2015 48.3224 25.006 48.0082 24.8777 47.6648C24.7495 47.3215 24.6912 46.956 24.7062 46.5898C24.7212 46.2236 24.8093 45.8641 24.9652 45.5324C25.1212 45.2007 25.3419 44.9036 25.6143 44.6584C25.8867 44.4132 26.2054 44.225 26.5517 44.1048C26.8979 43.9845 27.2646 43.9347 27.6304 43.9582C27.9961 43.9818 28.3535 44.0782 28.6815 44.2418C29.0094 44.4054 29.3014 44.6329 29.5402 44.9109L37.3244 53.5597L58.3945 28.4814C58.8672 27.935 59.5358 27.5965 60.256 27.5391C60.9762 27.4817 61.69 27.71 62.2432 28.1747C62.7964 28.6394 63.1445 29.3031 63.2123 30.0224C63.2801 30.7417 63.0621 31.4587 62.6055 32.0186Z"
                fill="#4ADE80"
              />
            </svg>
            <div className="text-white-primary text-center h2-bold">
              Snaps wallet removed successfully!
            </div>
            <p className="text-white-primary text-center mt-4 mb-3 b1-regular">
              You can still recover your wallet if you have a backup of your wallet file.
            </p>
            <Button
              className="max-sm:p-8 w-3/4 bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active self-center text-white-primary btn-lg"
              onClick={onLogout}>
              Continue
            </Button>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Homescreen;
