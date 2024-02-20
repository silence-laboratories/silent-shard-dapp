// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { QRCodeSVG } from 'qrcode.react';

import Layout, { StepProps } from '@/components/Layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface PairingProps {
  qr: string | null;
  seconds: number;
  loading: boolean;
  onTryAgainClick: () => void;
  step: StepProps;
}
const Pairing: React.FC<PairingProps> = ({ qr, seconds, onTryAgainClick, step, loading }) => {
  const isQrExpired = !(qr && seconds > 0);
  return (
    <div className="desc animate__animated animate__slideInUp animate__faster">
      <div className={`flex flex-col justify-center items-center`}>
        <Layout step={step} className="h-max" disabled={loading}>
          <div className="h2-bold text-white-primary leading-[38.4px] mt-4">Pair with Phone</div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <img className="h-[50%] mb-8" src="/v2/loading.gif" alt="loading" />
              <div className="text-center text-white-primary h2-bold" style={{ marginBottom: 140 }}>
                Pairing...
              </div>
            </div>
          )}
          {!loading && (
            <>
              <div className="b2-regular p-2 flex rounded-lg border bg-[rgba(96,154,250,0.1)] border-[#1e55af] text-[#BFD7FE] my-4">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none">
                  <path
                    d="M8 1.75C4.55375 1.75 1.75 4.55375 1.75 8C1.75 11.4462 4.55375 14.25 8 14.25C11.4462 14.25 14.25 11.4462 14.25 8C14.25 4.55375 11.4462 1.75 8 1.75ZM8 4.3125C8.1607 4.3125 8.31779 4.36015 8.4514 4.44943C8.58502 4.53871 8.68916 4.6656 8.75065 4.81407C8.81215 4.96253 8.82824 5.1259 8.79689 5.28351C8.76554 5.44112 8.68815 5.58589 8.57452 5.69952C8.46089 5.81315 8.31612 5.89054 8.15851 5.92189C8.0009 5.95324 7.83753 5.93715 7.68907 5.87565C7.5406 5.81416 7.41371 5.71002 7.32443 5.5764C7.23515 5.44279 7.1875 5.2857 7.1875 5.125C7.1875 4.90951 7.2731 4.70285 7.42548 4.55048C7.57785 4.3981 7.78451 4.3125 8 4.3125ZM9.5 11.375H6.75C6.61739 11.375 6.49021 11.3223 6.39645 11.2286C6.30268 11.1348 6.25 11.0076 6.25 10.875C6.25 10.7424 6.30268 10.6152 6.39645 10.5214C6.49021 10.4277 6.61739 10.375 6.75 10.375H7.625V7.625H7.125C6.99239 7.625 6.86521 7.57232 6.77145 7.47855C6.67768 7.38479 6.625 7.25761 6.625 7.125C6.625 6.99239 6.67768 6.86521 6.77145 6.77145C6.86521 6.67768 6.99239 6.625 7.125 6.625H8.125C8.25761 6.625 8.38479 6.67768 8.47855 6.77145C8.57232 6.86521 8.625 6.99239 8.625 7.125V10.375H9.5C9.63261 10.375 9.75979 10.4277 9.85355 10.5214C9.94732 10.6152 10 10.7424 10 10.875C10 11.0076 9.94732 11.1348 9.85355 11.2286C9.75979 11.3223 9.63261 11.375 9.5 11.375Z"
                    fill="#609AFA"
                  />
                </svg>
                <div>
                  Connecting your Silent Shard mobile app to your browser generates a distributed
                  key.
                </div>
              </div>
              {qr && seconds !== null && seconds > 0 && (
                <div className="flex flex-col items-center justify-center full-w mt-2">
                  <div
                    style={{
                      padding: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <QRCodeSVG
                      value={qr}
                      fgColor="#000"
                      bgColor="#FFF"
                      size={190}
                      className="max-h-[20.85vh] max-w-max bg-white-primary rounded-[8px] py-4 aspect-square"
                      imageSettings={{
                        width: 40,
                        height: 40,
                        src: '/v2/qr_logo.svg',
                        excavate: true,
                      }}
                    />
                    <div className="flex text-white-primary mt-4">
                      {' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.23 2.25035C17.5083 2.3729 21.7496 6.69233 21.7496 12.0001C21.7496 17.3897 17.393 21.7603 11.9982 21.7501C6.59878 21.74 2.18982 17.3028 2.24962 11.8983C2.27403 9.53481 3.1568 7.26075 4.73348 5.49981C5.00979 5.19122 5.48394 5.16505 5.79253 5.44135C6.10112 5.71765 6.1273 6.1918 5.85099 6.5004C4.51699 7.99029 3.77012 9.91434 3.74954 11.9141L3.74954 11.9147C3.69888 16.4804 7.43017 20.2415 12.001 20.2501C16.5624 20.2587 20.2496 16.564 20.2496 12.0001C20.2496 7.69613 16.9537 4.16023 12.7496 3.7813V7.12511C12.7496 7.53932 12.4138 7.87511 11.9996 7.87511C11.5854 7.87511 11.2496 7.53932 11.2496 7.12511V3.20569C11.2494 3.07801 11.2749 2.9516 11.3244 2.83394C11.3741 2.71585 11.4471 2.60898 11.5391 2.51971C11.631 2.43045 11.7399 2.3606 11.8595 2.31435C11.9775 2.26865 12.1035 2.2469 12.23 2.25035Z"
                          fill="#FEE28A"
                        />
                        <path
                          d="M10.9393 13.0609L7.23614 7.76401C7.18491 7.69062 7.16115 7.60154 7.16901 7.51239C7.17688 7.42323 7.21587 7.33969 7.27916 7.2764C7.34244 7.21311 7.42599 7.17412 7.51514 7.16625C7.6043 7.15839 7.69338 7.18216 7.76677 7.23339L13.0636 10.9365C13.3885 11.1705 13.6083 11.523 13.6753 11.9177C13.7423 12.3125 13.6512 12.7177 13.4217 13.0458C13.1922 13.3739 12.8428 13.5985 12.449 13.671C12.0553 13.7434 11.6488 13.658 11.3175 13.4331C11.1711 13.3316 11.0431 13.2057 10.9393 13.0609Z"
                          fill="#FEE28A"
                        />
                      </svg>
                      <span className="ml-1 b2-regular text-[#F6F7F9]">{seconds} secs</span>
                    </div>
                  </div>
                </div>
              )}
              {isQrExpired && (
                <div
                  className="mt-10"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div className="flex-1 flex flex-col items-center text-white-primary h-[150px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none">
                      <path
                        d="M28.0665 24.9425L17.4146 5.16125C16.6596 3.75875 14.6483 3.75875 13.8927 5.16125L3.24146 24.9425C3.07753 25.247 2.99534 25.5887 3.00292 25.9345C3.0105 26.2802 3.10758 26.618 3.2847 26.915C3.46181 27.212 3.7129 27.458 4.01347 27.629C4.31403 27.8 4.65379 27.8901 4.99959 27.8906H26.3052C26.6513 27.8907 26.9914 27.8009 27.2924 27.6302C27.5934 27.4594 27.8449 27.2134 28.0224 26.9163C28.1999 26.6193 28.2973 26.2812 28.305 25.9352C28.3127 25.5893 28.2305 25.2472 28.0665 24.9425ZM15.654 24.8281C15.4067 24.8281 15.1651 24.7548 14.9595 24.6175C14.7539 24.4801 14.5937 24.2849 14.4991 24.0565C14.4045 23.8281 14.3797 23.5767 14.428 23.3343C14.4762 23.0918 14.5953 22.8691 14.7701 22.6942C14.9449 22.5194 15.1676 22.4004 15.4101 22.3521C15.6526 22.3039 15.9039 22.3287 16.1323 22.4233C16.3607 22.5179 16.5559 22.6781 16.6933 22.8837C16.8306 23.0892 16.904 23.3309 16.904 23.5781C16.904 23.7423 16.8716 23.9048 16.8088 24.0565C16.746 24.2081 16.6539 24.3459 16.5378 24.462C16.4218 24.5781 16.284 24.6702 16.1323 24.733C15.9807 24.7958 15.8181 24.8281 15.654 24.8281ZM17.0115 12.2563L16.6527 19.8813C16.6527 20.1465 16.5474 20.4008 16.3598 20.5884C16.1723 20.7759 15.9179 20.8813 15.6527 20.8813C15.3875 20.8813 15.1331 20.7759 14.9456 20.5884C14.7581 20.4008 14.6527 20.1465 14.6527 19.8813L14.294 12.2594C14.2859 12.0772 14.3146 11.8954 14.3783 11.7245C14.442 11.5537 14.5395 11.3975 14.6649 11.2652C14.7903 11.1328 14.9411 11.0271 15.1082 10.9543C15.2753 10.8814 15.4554 10.843 15.6377 10.8413H15.6508C15.8344 10.8412 16.016 10.8782 16.1849 10.9503C16.3537 11.0223 16.5061 11.1278 16.6331 11.2604C16.76 11.393 16.8587 11.5499 16.9233 11.7217C16.9879 11.8935 17.0171 12.0766 17.009 12.26L17.0115 12.2563Z"
                        fill="#FDD147"
                      />
                    </svg>
                    <div className="mt-2 mb-4 btn-lg">QR code expired</div>
                    <Button
                      className="w-2/3 h-10 bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active text-white-primary btn-lg"
                      onClick={onTryAgainClick}>
                      Try again
                    </Button>
                  </div>
                </div>
              )}
              <div
                className={`b2-regular flex flex-col space-y-2 text-[#B6BAC3] mt-4 ${
                  isQrExpired ? 'opacity-30' : ''
                }`}>
                <div>Follow these steps to pair your mobile device with Snap:</div>
                <div className="flex items-center">
                  <Avatar className="mr-1">
                    <AvatarFallback className="bg-gray-custom">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 1.25C10.3452 1.25 10.625 1.52982 10.625 1.875V12.2411L12.6831 10.1831C12.9271 9.93898 13.3229 9.93898 13.5669 10.1831C13.811 10.4271 13.811 10.8229 13.5669 11.0669L10.4419 14.1919C10.1979 14.436 9.80214 14.436 9.55806 14.1919L6.43306 11.0669C6.18898 10.8229 6.18898 10.4271 6.43306 10.1831C6.67714 9.93898 7.07286 9.93898 7.31694 10.1831L9.375 12.2411V1.875C9.375 1.52982 9.65482 1.25 10 1.25ZM5.3125 7.5C5.06386 7.5 4.8254 7.59877 4.64959 7.77459C4.47377 7.9504 4.375 8.18886 4.375 8.4375V16.5625C4.375 16.8111 4.47377 17.0496 4.64959 17.2254C4.8254 17.4012 5.06386 17.5 5.3125 17.5H14.6875C14.9361 17.5 15.1746 17.4012 15.3504 17.2254C15.5262 17.0496 15.625 16.8111 15.625 16.5625V8.4375C15.625 8.18886 15.5262 7.9504 15.3504 7.77459C15.1746 7.59877 14.9361 7.5 14.6875 7.5H13.125C12.7798 7.5 12.5 7.22018 12.5 6.875C12.5 6.52982 12.7798 6.25 13.125 6.25H14.6875C15.2677 6.25 15.8241 6.48047 16.2343 6.8907C16.6445 7.30094 16.875 7.85734 16.875 8.4375V16.5625C16.875 17.1427 16.6445 17.6991 16.2343 18.1093C15.8241 18.5195 15.2677 18.75 14.6875 18.75H5.3125C4.73234 18.75 4.17594 18.5195 3.7657 18.1093C3.35547 17.6991 3.125 17.1427 3.125 16.5625V8.4375C3.125 7.85734 3.35547 7.30094 3.7657 6.8907C4.17594 6.48047 4.73234 6.25 5.3125 6.25H6.875C7.22018 6.25 7.5 6.52982 7.5 6.875C7.5 7.22018 7.22018 7.5 6.875 7.5H5.3125Z"
                          fill="#F6F7F9"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center flex-wrap flex-1">
                    Install{' '}
                    <img
                      className="mx-2"
                      src="/v2/sl-logo.png"
                      alt="sllogosm"
                      style={{ height: 20, width: 20, borderRadius: 4 }}
                    />
                    <div className="mr-1 text-white-primary b2-bold">Silent Shard</div> app from
                    <a
                      className="underline mx-1 text-indigo-custom"
                      href="https://play.google.com/store/apps/details?id=com.silencelaboratories.silentshard"
                      target="_blank"
                      rel="noreferrer">
                      Play Store
                    </a>{' '}
                    or{' '}
                    <a
                      className="underline mx-1 text-indigo-custom"
                      href="https://apps.apple.com/in/app/silent-shard/id6468993285"
                      target="_blank"
                      rel="noreferrer">
                      App Store.
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="mr-1">
                    <AvatarFallback className="bg-gray-custom">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.0625 4.375C8.81386 4.375 8.5754 4.47377 8.39959 4.64959C8.22377 4.8254 8.125 5.06386 8.125 5.3125V6.875C8.125 7.22018 7.84518 7.5 7.5 7.5C7.15482 7.5 6.875 7.22018 6.875 6.875V5.3125C6.875 4.73234 7.10547 4.17594 7.5157 3.7657C7.92594 3.35547 8.48234 3.125 9.0625 3.125H15.3125C15.8927 3.125 16.4491 3.35547 16.8593 3.7657C17.2695 4.17594 17.5 4.73234 17.5 5.3125V14.6875C17.5 15.2677 17.2695 15.8241 16.8593 16.2343C16.4491 16.6445 15.8927 16.875 15.3125 16.875H9.375C8.78813 16.875 8.18633 16.6431 7.72845 16.2843C7.27296 15.9274 6.875 15.373 6.875 14.6875V13.125C6.875 12.7798 7.15482 12.5 7.5 12.5C7.84518 12.5 8.125 12.7798 8.125 13.125V14.6875C8.125 14.8649 8.2331 15.0917 8.49939 15.3004C8.76328 15.5071 9.09898 15.625 9.375 15.625H15.3125C15.5611 15.625 15.7996 15.5262 15.9754 15.3504C16.1512 15.1746 16.25 14.9361 16.25 14.6875V5.3125C16.25 5.06386 16.1512 4.8254 15.9754 4.64959C15.7996 4.47377 15.5611 4.375 15.3125 4.375H9.0625ZM10.8081 6.43306C11.0521 6.18898 11.4479 6.18898 11.6919 6.43306L14.8169 9.55806C15.061 9.80214 15.061 10.1979 14.8169 10.4419L11.6919 13.5669C11.4479 13.811 11.0521 13.811 10.8081 13.5669C10.564 13.3229 10.564 12.9271 10.8081 12.6831L12.8661 10.625H3.125C2.77982 10.625 2.5 10.3452 2.5 10C2.5 9.65482 2.77982 9.375 3.125 9.375H12.8661L10.8081 7.31694C10.564 7.07286 10.564 6.67714 10.8081 6.43306Z"
                          fill="#F6F7F9"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">Sign in with your Google account or Apple ID.</div>
                </div>
                <div className="flex items-center flex-wrap">
                  <Avatar className="mr-1">
                    <AvatarFallback className="bg-gray-custom">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.6393 1.91938C14.01 1.84969 14.3915 1.86219 14.7569 1.95603C15.1244 2.05041 15.4665 2.22472 15.7588 2.46653C16.0512 2.70835 16.2866 3.0117 16.4482 3.35496C16.6098 3.69821 16.6936 4.0729 16.6937 4.4523V4.4525V5.03865C17.8628 5.24807 18.75 6.27012 18.75 7.49939V14.9994C18.75 16.3801 17.6307 17.4994 16.25 17.4994H3.75C2.36929 17.4994 1.25 16.3801 1.25 14.9994V7.49939L1.25 7.49788V6.2105V6.21031C1.24969 5.61014 1.45878 5.02866 1.84124 4.56612C2.22379 4.10347 2.75579 3.78882 3.3455 3.67644C3.34944 3.67568 3.35339 3.67497 3.35735 3.6743L13.6393 1.91938ZM15.4437 4.4527V4.99939H3.75C3.53826 4.99939 3.33267 5.02571 3.13632 5.07527C3.27005 4.99366 3.41814 4.93576 3.57416 4.90537L13.8552 3.15062C13.8572 3.15026 13.8593 3.1499 13.8614 3.14952C13.8633 3.14918 13.8651 3.14884 13.867 3.14848C14.059 3.11189 14.2567 3.11813 14.446 3.16674C14.6353 3.21536 14.8115 3.30516 14.9621 3.42973C15.1127 3.5543 15.234 3.71058 15.3172 3.8874C15.4005 4.06417 15.4437 4.25712 15.4437 4.4525V4.4527ZM2.5 14.9994L2.5 8.12437V7.49816C2.50067 6.80837 3.06006 6.24939 3.75 6.24939H16.25C16.9404 6.24939 17.5 6.80903 17.5 7.49939V14.9994C17.5 15.6897 16.9404 16.2494 16.25 16.2494H3.75C3.05964 16.2494 2.5 15.6897 2.5 14.9994ZM13.6805 12.2887C13.8861 12.4261 14.1278 12.4994 14.375 12.4994C14.7065 12.4994 15.0245 12.3677 15.2589 12.1333C15.4933 11.8989 15.625 11.5809 15.625 11.2494C15.625 11.0022 15.5517 10.7605 15.4143 10.5549C15.277 10.3494 15.0818 10.1892 14.8534 10.0945C14.6249 9.99993 14.3736 9.97518 14.1311 10.0234C13.8887 10.0716 13.6659 10.1907 13.4911 10.3655C13.3163 10.5403 13.1973 10.7631 13.149 11.0055C13.1008 11.248 13.1255 11.4993 13.2202 11.7277C13.3148 11.9562 13.475 12.1514 13.6805 12.2887Z"
                          fill="#F6F7F9"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex-wrap">
                    Click on{' '}
                    <span className="mx-1 text-white-primary b2-bold">Pair with a new Account</span>{' '}
                    and scan the QR code displayed on this screen.
                  </div>
                </div>
              </div>
            </>
          )}
        </Layout>
        <div className="mt-6 text-[#B6BAC3] text-center label-regular w-[90vw] lg:w-max">
          <div>
            By using the Silent Shard Snap and the companion products (Silent Shard DApp and Silent
            Shard Mobile Application), you are accepting the
            <span className="mx-1 text-white-primary b2-bold">Terms of use</span>and
            <span className="mx-1 text-white-primary b2-bold">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pairing;
