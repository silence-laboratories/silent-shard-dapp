// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { KeyringAccount } from '@metamask/keyring-api';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AnalyticEvent, EventName, EventScreen, trackAnalyticEvent } from '@/api/analytic';
import { runBackup } from '@/api/snap';
import { AddressCopyPopover } from '@/components/AddressCopyPopover';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
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

interface HomescreenProps {
  onContinueClick: () => void;
  onSnapUpdate: () => Promise<void>;
  onRePairing: () => Promise<void>;
  onDeleteAccount: () => Promise<boolean | undefined>;
  currentSnapVersion: string;
  latestSnapVersion: string;
  account: KeyringAccount | null;
  isRepaired: boolean;
  provider: EIP1193Provider;
}

let isNewSession = true;
const VERSION_OF_NEW_FEATURE_RECOVERY = '1.2.7';
const VERSION_OF_NEW_FEATURE_SEND_BACKUP = '1.2.9';
const Homescreen: React.FC<HomescreenProps> = ({
  onContinueClick,
  onSnapUpdate,
  onRePairing,
  onDeleteAccount,
  account,
  currentSnapVersion,
  latestSnapVersion,
  isRepaired = false,
  provider,
}) => {
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [isNewFeatureRecoveryReady, setIsNewFeatureRecoveryReady] = useState(false);
  const [isNewFeatureSendBackupReady, setIsNewFeatureSendBackupReady] = useState(false);
  trackAnalyticEvent(
    EventName.new_page_visit,
    new AnalyticEvent().setScreen(EventScreen.dashboard)
  );

  if (isNewSession) {
    trackAnalyticEvent(
      EventName.new_page_visit,
      new AnalyticEvent().setScreen(EventScreen.dashboard)
    );
    isNewSession = false;
    const toId = setTimeout(() => {
      isNewSession = true;
      clearTimeout(toId);
    }, 30 * 60 * 1000);
  }

  // TODO: In future we might want update Snap version automatically
  const handleUpdateSnap = async () => {
    await onSnapUpdate();
    setShowUpdateBanner(false);
  };

  const handleDeleteAccount = async () => {
    setShowOverlay(true);
    setOpenSettings(false);
    try {
      const isDeleted = await onDeleteAccount();
      if (isDeleted) {
        setShowRemoveSuccess(true);
      }
    } finally {
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    const isUpdateAvailable =
      latestSnapVersion && currentSnapVersion
        ? compareVersions(latestSnapVersion, currentSnapVersion) > 0
        : false;

    setShowUpdateBanner(isUpdateAvailable);
    const isNewFeatureRecoveryReady =
      compareVersions(VERSION_OF_NEW_FEATURE_RECOVERY, latestSnapVersion) <= 0 &&
      compareVersions(VERSION_OF_NEW_FEATURE_RECOVERY, currentSnapVersion) <= 0;
    setIsNewFeatureRecoveryReady(isNewFeatureRecoveryReady);
    const isNewFeatureSendBackupReady =
      compareVersions(VERSION_OF_NEW_FEATURE_SEND_BACKUP, latestSnapVersion) <= 0 &&
      compareVersions(VERSION_OF_NEW_FEATURE_SEND_BACKUP, currentSnapVersion) <= 0;
    setIsNewFeatureSendBackupReady(isNewFeatureSendBackupReady);

    console.log('current version:', currentSnapVersion);
  }, [latestSnapVersion, currentSnapVersion]);

  return (
    <div className="animate__animated animate__slideInUp animate__faster">
      {!showRemoveSuccess ? (
        <Layout overlay={showOverlay} className="border-none bg-transparent h-max py-0 px-0">
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
                <div className="text-center">
                  {isRepaired
                    ? 'Your Silent Account is operational again!'
                    : 'Your Silent Account is ready!'}
                </div>
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
                onClick={handleUpdateSnap}>
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
                <AddressCopyPopover address={account?.address || 'Address not found'} />
                <div className="flex text-[#EDEEF1] justify-center md:justify-start">
                  <img className="mr-1" src="/v2/mmicon.svg" alt="mmicon" />
                  <div className="b2-regular">MetaMask</div>
                </div>
              </div>
              <div className="ml-auto"></div>
              <Popover open={openSettings} onOpenChange={setOpenSettings}>
                <PopoverTrigger>
                  <Button className="bg-gray-custom rounded-full w-8 h-8" size="icon">
                    <MoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex justify-center w-18 p-1 bg-[#111112] border-[#434E61] border-[1px]">
                  <div className="flex flex-col gap-2 bg-[#111112] text-white-primary p-2">
                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#1E1F25] rounded-[8px] cursor-pointer p-2"
                      onClick={!isNewFeatureRecoveryReady ? undefined : onRePairing}>
                      <div
                        className={`flex rounded-full p-2 mr-2 ${
                          !isNewFeatureRecoveryReady ? 'opacity-50' : 'opacity-100'
                        }`}
                        style={{ background: '#23272E' }}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.4716 7.42794C17.904 8.43841 18.1263 9.52629 18.125 10.6254C18.1248 15.111 14.4857 18.75 9.99999 18.75C5.51419 18.75 1.87499 15.1108 1.87499 10.625V10.625C1.87511 8.94458 2.396 7.30553 3.36599 5.93338C4.33597 4.56123 5.70737 3.52342 7.29147 2.96276C7.61686 2.8476 7.97401 3.01802 8.08918 3.34342C8.20435 3.66882 8.03392 4.02597 7.70852 4.14114C6.36803 4.61557 5.20752 5.49379 4.3867 6.65493C3.56589 7.81606 3.1251 9.20304 3.12499 10.625L16.875 10.6254C16.875 10.6252 16.875 10.6251 16.875 10.625V10.6246L16.875 10.6242C16.8762 9.69457 16.6881 8.7744 16.3224 7.91971C15.9587 7.06979 15.4268 6.30229 14.7588 5.66338L14.3051 5.27342L12.3168 7.26175C11.923 7.6555 11.25 7.3766 11.25 6.81957V2.50003C11.25 2.33427 11.3158 2.1753 11.4331 2.05809C11.5503 1.94088 11.7092 1.87503 11.875 1.87503H16.1945C16.7516 1.87503 17.0312 2.54808 16.6367 2.94183L15.1915 4.38702L15.598 4.73639L15.6095 4.74735C16.4056 5.50532 17.0391 6.41735 17.4716 7.42794ZM16.875 10.6254L3.12499 10.625C3.12502 14.4205 6.20456 17.5 9.99999 17.5C13.7953 17.5 16.8748 14.4206 16.875 10.6254Z"
                            fill="#F6F7F9"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`${
                            !isNewFeatureRecoveryReady ? 'opacity-50' : 'opacity-100'
                          }`}>
                          Recover account on phone
                        </span>
                        {!isNewFeatureRecoveryReady && <span>(Update Snap to conitnue)</span>}
                      </div>
                      <div className="flex-1"></div>
                    </div>

                    <Separator className="w-[248px] ml-3 my-1 bg-[#3A4252]" />
                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#1E1F25] rounded-[8px] cursor-pointer p-2"
                      onClick={
                        !isNewFeatureRecoveryReady
                          ? undefined
                          : async () => {
                              await runBackup(provider);
                            }
                      }>
                      <div className="flex rounded-full p-2 mr-2" style={{ background: '#23272E' }}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17.1836 15.8438H17.1524L17.1211 15.8398C17.0156 15.8281 16.9102 15.8047 16.8086 15.7617L14.5938 14.9766L14.5781 14.9688C14.5313 14.9492 14.4805 14.9375 14.4258 14.9375C14.375 14.9375 14.3281 14.9453 14.2813 14.9648C14.2305 14.9844 13.7422 15.168 13.2344 15.3086C12.957 15.3828 11.9961 15.6328 11.2266 15.6328C9.25392 15.6328 7.41017 14.875 6.03517 13.5C4.67189 12.1367 3.92189 10.3281 3.92189 8.40234C3.92189 7.91016 3.97657 7.41406 4.08204 6.93359C4.42579 5.34766 5.33595 3.90625 6.64064 2.87109C7.95704 1.82422 9.62892 1.25 11.3399 1.25C13.3789 1.25 15.2813 2.03125 16.6914 3.44531C18.0274 4.78516 18.7578 6.54297 18.75 8.40234C18.75 9.78516 18.3399 11.125 17.5664 12.2773L17.5469 12.3086C17.5313 12.3281 17.5195 12.3477 17.5039 12.3672C17.4844 12.3984 17.4727 12.4258 17.4649 12.4453L18.0781 14.6289C18.1016 14.7031 18.1133 14.7812 18.1211 14.8594V14.9063C18.1211 15.4219 17.6992 15.8438 17.1836 15.8438ZM15.0391 13.8086L16.7149 14.4023L16.2344 12.6875C16.1563 12.4023 16.2188 12.082 16.4258 11.7305L16.4297 11.7227C16.4649 11.668 16.5 11.6133 16.5391 11.5586C17.168 10.6172 17.5 9.52344 17.5 8.39453C17.5039 6.87109 16.9024 5.42578 15.8047 4.32422C14.6289 3.14844 13.043 2.5 11.3399 2.5C8.4297 2.5 5.88673 4.47656 5.29689 7.19922C5.21095 7.59375 5.16798 8 5.16798 8.40234C5.16798 11.6992 7.88282 14.3828 11.2227 14.3828C11.7109 14.3828 12.4336 14.2344 12.9024 14.1055C13.3633 13.9805 13.8203 13.8086 13.8399 13.8008C14.0274 13.7305 14.2227 13.6953 14.4258 13.6953C14.6328 13.6914 14.8399 13.7305 15.0391 13.8086Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M2.80865 18.75C2.5938 18.75 2.38677 18.6758 2.2188 18.543L2.20708 18.5352C1.94537 18.3164 1.82427 17.9688 1.89068 17.6367C2.00396 17.0547 2.23833 15.832 2.32427 15.3789C2.32427 15.3789 2.32427 15.3789 2.32427 15.375C1.67193 14.4063 1.30474 13.2734 1.25396 12.1094C1.20318 10.9414 1.48052 9.78516 2.04693 8.76172C2.2149 8.46094 2.5938 8.35156 2.89849 8.51953C3.19927 8.6875 3.30865 9.06641 3.14068 9.37109C2.20708 11.0508 2.28912 13.0859 3.36333 14.6836L3.36724 14.6875C3.51177 14.9063 3.64849 15.168 3.58208 15.4766C3.56646 15.5547 3.38677 16.4805 3.22662 17.3203L4.89458 16.668C5.19537 16.5508 5.5274 16.5547 5.82818 16.6797C6.53912 16.957 7.2813 17.1016 7.9688 17.1016C7.97271 17.1016 7.97271 17.1016 7.97662 17.1016C8.96099 17.1016 9.93365 16.8398 10.7852 16.3477C11.0821 16.1758 11.4649 16.2773 11.6407 16.5742C11.8126 16.8711 11.711 17.2539 11.4141 17.4297C10.3711 18.0352 9.18365 18.3516 7.98052 18.3516C7.97662 18.3516 7.97662 18.3516 7.97271 18.3516C7.12896 18.3516 6.23052 18.1758 5.37115 17.8398L5.35552 17.832L3.17193 18.6875C3.06255 18.7344 2.94537 18.7578 2.82427 18.7578C2.81255 18.75 2.81255 18.75 2.80865 18.75Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M10.8608 9.95455V9.91193C10.8655 9.45975 10.9129 9.09991 11.0028 8.83239C11.0928 8.56487 11.2206 8.34825 11.3864 8.18253C11.5521 8.01681 11.7509 7.86411 11.983 7.72443C12.1226 7.6392 12.2481 7.53859 12.3594 7.42259C12.4706 7.30421 12.5582 7.16809 12.6222 7.0142C12.6884 6.86032 12.7216 6.68987 12.7216 6.50284C12.7216 6.27083 12.6671 6.0696 12.5582 5.89915C12.4493 5.72869 12.3037 5.5973 12.1214 5.50497C11.9392 5.41264 11.7367 5.36648 11.5142 5.36648C11.3201 5.36648 11.133 5.40672 10.9531 5.48722C10.7732 5.56771 10.6229 5.69437 10.5021 5.86719C10.3814 6.04001 10.3116 6.2661 10.2926 6.54545H9.39773C9.41667 6.14299 9.52083 5.79853 9.71023 5.51207C9.90199 5.22562 10.1541 5.00663 10.4666 4.85511C10.7815 4.7036 11.1307 4.62784 11.5142 4.62784C11.9309 4.62784 12.2931 4.7107 12.6009 4.87642C12.911 5.04214 13.1501 5.26941 13.3182 5.55824C13.4886 5.84706 13.5739 6.17614 13.5739 6.54545C13.5739 6.80587 13.5336 7.04143 13.4531 7.25213C13.375 7.46283 13.2614 7.65104 13.1122 7.81676C12.9654 7.98248 12.7879 8.12926 12.5795 8.2571C12.3712 8.38731 12.2043 8.52462 12.0788 8.66903C11.9534 8.81108 11.8622 8.98035 11.8054 9.17685C11.7486 9.37334 11.7178 9.61837 11.7131 9.91193V9.95455H10.8608ZM11.3153 12.0568C11.1402 12.0568 10.9898 11.9941 10.8643 11.8686C10.7389 11.7431 10.6761 11.5928 10.6761 11.4176C10.6761 11.2424 10.7389 11.0921 10.8643 10.9666C10.9898 10.8411 11.1402 10.7784 11.3153 10.7784C11.4905 10.7784 11.6409 10.8411 11.7663 10.9666C11.8918 11.0921 11.9545 11.2424 11.9545 11.4176C11.9545 11.5336 11.925 11.6402 11.8658 11.7372C11.8089 11.8343 11.732 11.9124 11.6349 11.9716C11.5402 12.0284 11.4337 12.0568 11.3153 12.0568Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`${
                            !isNewFeatureSendBackupReady ? 'opacity-50' : 'opacity-100'
                          }`}>
                          Resend Backup
                        </span>
                        {!isNewFeatureSendBackupReady && <span>(Update Snap to conitnue)</span>}
                      </div>
                      <div className="flex-1"></div>
                    </div>

                    <Separator className="w-[248px] ml-3 my-1 bg-[#3A4252]" />
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
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17.1836 15.8438H17.1524L17.1211 15.8398C17.0156 15.8281 16.9102 15.8047 16.8086 15.7617L14.5938 14.9766L14.5781 14.9688C14.5313 14.9492 14.4805 14.9375 14.4258 14.9375C14.375 14.9375 14.3281 14.9453 14.2813 14.9648C14.2305 14.9844 13.7422 15.168 13.2344 15.3086C12.957 15.3828 11.9961 15.6328 11.2266 15.6328C9.25392 15.6328 7.41017 14.875 6.03517 13.5C4.67189 12.1367 3.92189 10.3281 3.92189 8.40234C3.92189 7.91016 3.97657 7.41406 4.08204 6.93359C4.42579 5.34766 5.33595 3.90625 6.64064 2.87109C7.95704 1.82422 9.62892 1.25 11.3399 1.25C13.3789 1.25 15.2813 2.03125 16.6914 3.44531C18.0274 4.78516 18.7578 6.54297 18.75 8.40234C18.75 9.78516 18.3399 11.125 17.5664 12.2773L17.5469 12.3086C17.5313 12.3281 17.5195 12.3477 17.5039 12.3672C17.4844 12.3984 17.4727 12.4258 17.4649 12.4453L18.0781 14.6289C18.1016 14.7031 18.1133 14.7812 18.1211 14.8594V14.9063C18.1211 15.4219 17.6992 15.8438 17.1836 15.8438ZM15.0391 13.8086L16.7149 14.4023L16.2344 12.6875C16.1563 12.4023 16.2188 12.082 16.4258 11.7305L16.4297 11.7227C16.4649 11.668 16.5 11.6133 16.5391 11.5586C17.168 10.6172 17.5 9.52344 17.5 8.39453C17.5039 6.87109 16.9024 5.42578 15.8047 4.32422C14.6289 3.14844 13.043 2.5 11.3399 2.5C8.4297 2.5 5.88673 4.47656 5.29689 7.19922C5.21095 7.59375 5.16798 8 5.16798 8.40234C5.16798 11.6992 7.88282 14.3828 11.2227 14.3828C11.7109 14.3828 12.4336 14.2344 12.9024 14.1055C13.3633 13.9805 13.8203 13.8086 13.8399 13.8008C14.0274 13.7305 14.2227 13.6953 14.4258 13.6953C14.6328 13.6914 14.8399 13.7305 15.0391 13.8086Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M2.80865 18.75C2.5938 18.75 2.38677 18.6758 2.2188 18.543L2.20708 18.5352C1.94537 18.3164 1.82427 17.9688 1.89068 17.6367C2.00396 17.0547 2.23833 15.832 2.32427 15.3789C2.32427 15.3789 2.32427 15.3789 2.32427 15.375C1.67193 14.4063 1.30474 13.2734 1.25396 12.1094C1.20318 10.9414 1.48052 9.78516 2.04693 8.76172C2.2149 8.46094 2.5938 8.35156 2.89849 8.51953C3.19927 8.6875 3.30865 9.06641 3.14068 9.37109C2.20708 11.0508 2.28912 13.0859 3.36333 14.6836L3.36724 14.6875C3.51177 14.9063 3.64849 15.168 3.58208 15.4766C3.56646 15.5547 3.38677 16.4805 3.22662 17.3203L4.89458 16.668C5.19537 16.5508 5.5274 16.5547 5.82818 16.6797C6.53912 16.957 7.2813 17.1016 7.9688 17.1016C7.97271 17.1016 7.97271 17.1016 7.97662 17.1016C8.96099 17.1016 9.93365 16.8398 10.7852 16.3477C11.0821 16.1758 11.4649 16.2773 11.6407 16.5742C11.8126 16.8711 11.711 17.2539 11.4141 17.4297C10.3711 18.0352 9.18365 18.3516 7.98052 18.3516C7.97662 18.3516 7.97662 18.3516 7.97271 18.3516C7.12896 18.3516 6.23052 18.1758 5.37115 17.8398L5.35552 17.832L3.17193 18.6875C3.06255 18.7344 2.94537 18.7578 2.82427 18.7578C2.81255 18.75 2.81255 18.75 2.80865 18.75Z"
                            fill="#F6F7F9"
                          />
                          <path
                            d="M10.8608 9.95455V9.91193C10.8655 9.45975 10.9129 9.09991 11.0028 8.83239C11.0928 8.56487 11.2206 8.34825 11.3864 8.18253C11.5521 8.01681 11.7509 7.86411 11.983 7.72443C12.1226 7.6392 12.2481 7.53859 12.3594 7.42259C12.4706 7.30421 12.5582 7.16809 12.6222 7.0142C12.6884 6.86032 12.7216 6.68987 12.7216 6.50284C12.7216 6.27083 12.6671 6.0696 12.5582 5.89915C12.4493 5.72869 12.3037 5.5973 12.1214 5.50497C11.9392 5.41264 11.7367 5.36648 11.5142 5.36648C11.3201 5.36648 11.133 5.40672 10.9531 5.48722C10.7732 5.56771 10.6229 5.69437 10.5021 5.86719C10.3814 6.04001 10.3116 6.2661 10.2926 6.54545H9.39773C9.41667 6.14299 9.52083 5.79853 9.71023 5.51207C9.90199 5.22562 10.1541 5.00663 10.4666 4.85511C10.7815 4.7036 11.1307 4.62784 11.5142 4.62784C11.9309 4.62784 12.2931 4.7107 12.6009 4.87642C12.911 5.04214 13.1501 5.26941 13.3182 5.55824C13.4886 5.84706 13.5739 6.17614 13.5739 6.54545C13.5739 6.80587 13.5336 7.04143 13.4531 7.25213C13.375 7.46283 13.2614 7.65104 13.1122 7.81676C12.9654 7.98248 12.7879 8.12926 12.5795 8.2571C12.3712 8.38731 12.2043 8.52462 12.0788 8.66903C11.9534 8.81108 11.8622 8.98035 11.8054 9.17685C11.7486 9.37334 11.7178 9.61837 11.7131 9.91193V9.95455H10.8608ZM11.3153 12.0568C11.1402 12.0568 10.9898 11.9941 10.8643 11.8686C10.7389 11.7431 10.6761 11.5928 10.6761 11.4176C10.6761 11.2424 10.7389 11.0921 10.8643 10.9666C10.9898 10.8411 11.1402 10.7784 11.3153 10.7784C11.4905 10.7784 11.6409 10.8411 11.7663 10.9666C11.8918 11.0921 11.9545 11.2424 11.9545 11.4176C11.9545 11.5336 11.925 11.6402 11.8658 11.7372C11.8089 11.8343 11.732 11.9124 11.6349 11.9716C11.5402 12.0284 11.4337 12.0568 11.3153 12.0568Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      FAQs
                      <div className="flex-1"></div>
                    </div>
                    <Separator className="w-[248px] ml-3 my-1 bg-[#3A4252]" />
                    <div
                      className="bg-[#111112] flex justify-center items-center hover:bg-[#EF444433] rounded-[8px] cursor-pointer p-2"
                      onClick={handleDeleteAccount}>
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
            <Footer />
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
              onClick={onContinueClick}>
              Continue
            </Button>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Homescreen;
