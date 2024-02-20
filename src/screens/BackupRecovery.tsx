// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import { useState } from 'react';

import Layout, { StepProps } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const BackupContent: React.FC<{ deviceOS: string }> = ({ deviceOS }) => {
  return (
    <div className="flex flex-1 flex-wrap flex-col sm:flex-row overflow-y-auto max-h-[90vh] md:max-h-[40vh] lg:max-h-[32.22vh]">
      <div
        className="flex flex-col space-y-2 p-4 flex-1 flex-grow sm:w-[50%] m-3"
        style={{ background: '#111112', borderRadius: '8px' }}>
        <div className="text-[#B6BAC3] label-regular">Option 1</div>
        {deviceOS === 'android' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none">
            <path
              d="M36.9656 17.3031L36.7891 16.5539H20.5047V23.4461H30.2344C29.2242 28.243 24.5367 30.768 20.7078 30.768C17.9219 30.768 14.9852 29.5961 13.0414 27.7125C12.0159 26.7028 11.1996 25.5008 10.6392 24.1752C10.0789 22.8497 9.78544 21.4266 9.77578 19.9875C9.77578 17.0844 11.0805 14.1805 12.9789 12.2703C14.8773 10.3602 17.7445 9.29141 20.5953 9.29141C23.8602 9.29141 26.2 11.025 27.075 11.8156L31.9727 6.94375C30.5359 5.68125 26.5891 2.5 20.4375 2.5C15.6914 2.5 11.1406 4.31797 7.81406 7.63359C4.53125 10.8984 2.83203 15.6195 2.83203 20C2.83203 24.3805 4.43984 28.8656 7.62109 32.1562C11.0203 35.6656 15.8344 37.5 20.7914 37.5C25.3016 37.5 29.5766 35.7328 32.6234 32.5266C35.6187 29.3703 37.168 25.0031 37.168 20.425C37.168 18.4977 36.9742 17.3531 36.9656 17.3031Z"
              fill="#867DFC"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none">
            <path
              d="M27.2768 10.6922C24.1268 10.6922 22.7955 12.1953 20.6018 12.1953C18.3526 12.1953 16.6369 10.7031 13.9072 10.7031C11.2354 10.7031 8.38615 12.3344 6.57677 15.1133C4.03615 19.032 4.4674 26.4125 8.58224 32.7C10.0541 34.9508 12.0197 37.475 14.5979 37.5023H14.6447C16.8854 37.5023 17.551 36.0352 20.6346 36.018H20.6815C23.719 36.018 24.3283 37.4937 26.5596 37.4937H26.6065C29.1846 37.4664 31.2557 34.6695 32.7276 32.4273C33.7869 30.8148 34.1807 30.0055 34.9932 28.1812C29.0408 25.9219 28.0846 17.4836 33.9713 14.2484C32.1744 11.9984 29.6494 10.6953 27.269 10.6953L27.2768 10.6922Z"
              fill="#867DFC"
            />
            <path
              d="M26.583 2.5C24.708 2.62734 22.5205 3.82109 21.2393 5.37969C20.0768 6.79219 19.1205 8.8875 19.4955 10.9195H19.6455C21.6424 10.9195 23.6861 9.71719 24.8799 8.17656C26.0299 6.71016 26.9018 4.63203 26.583 2.5Z"
              fill="#867DFC"
            />
          </svg>
        )}
        <div className="text-[#EDEEF1] b2-bold">
          {deviceOS === 'android' ? 'Google Password Manager' : 'iCloud Keychain'}
        </div>
        <p className="text-[#EDEEF1] label-regular">
          {deviceOS === 'android'
            ? 'Store backup on Google Password Manager using your preferred email address. This email will be used for future recovery processes.'
            : 'Store backup on iCloud Keychain using your Apple ID. This Apple ID will be used for future recovery processes.'}
        </p>
      </div>

      <div
        className="flex flex-col space-y-2 p-4 flex-1 flex-grow sm:w-[50%] m-3"
        style={{ background: '#111112', borderRadius: '8px' }}>
        <div className="text-[#B6BAC3] label-regular">Option 2</div>
        <div className="flex items-center space-x-2 flex-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none">
            <path
              d="M9.0868 10.9641C10.5938 7.24877 14.3686 3.73438 20 3.73438C26.0587 3.73438 31.2224 7.85671 32.3546 14.5277C33.9532 14.767 35.6269 15.3792 37.0051 16.403C38.7181 17.6754 40 19.6143 40 22.2031C40 24.7133 38.9432 26.7102 37.2226 28.0488C35.5361 29.3609 33.2915 29.9844 30.9375 29.9844H25C24.3096 29.9844 23.75 29.4247 23.75 28.7344C23.75 28.044 24.3096 27.4844 25 27.4844H30.9375C32.8804 27.4844 34.542 26.9668 35.6875 26.0756C36.799 25.2109 37.5 23.9422 37.5 22.2031C37.5 20.5428 36.7116 19.2992 35.5144 18.4099C34.2864 17.4977 32.6588 16.9932 31.1882 16.9203C30.5724 16.8898 30.0709 16.415 30.0068 15.8018C29.377 9.77611 25.0461 6.23438 20 6.23438C15.235 6.23438 12.1885 9.37782 11.1903 12.491C11.0377 12.9671 10.616 13.3065 10.1182 13.3538C5.81075 13.763 2.5 16.4148 2.5 20.4219C2.5 24.4502 5.98088 27.4844 10.625 27.4844H15C15.6904 27.4844 16.25 28.044 16.25 28.7344C16.25 29.4247 15.6904 29.9844 15 29.9844H10.625C4.95662 29.9844 0 26.1623 0 20.4219C0 14.9625 4.32226 11.7009 9.0868 10.9641Z"
              fill="#867DFC"
            />
            <path
              d="M20.8839 14.1005L25.8839 19.1005C26.372 19.5886 26.372 20.3801 25.8839 20.8683C25.3957 21.3564 24.6043 21.3564 24.1161 20.8683L21.25 18.0021V35.0172C21.25 35.7075 20.6904 36.2672 20 36.2672C19.3096 36.2672 18.75 35.7075 18.75 35.0172V18.0021L15.8839 20.8683C15.3957 21.3564 14.6043 21.3564 14.1161 20.8683C13.628 20.3801 13.628 19.5886 14.1161 19.1005L19.1161 14.1005C19.6043 13.6123 20.3957 13.6123 20.8839 14.1005Z"
              fill="#867DFC"
            />
          </svg>

          <img src="/v2/ggdrive.svg" alt="" />
          <img src="/v2/onedrive.svg" alt="" />
          <img src="/v2/openfolder.svg" alt="" />
          <img src="/v2/dropbox.svg" alt="" />

          <span
            className="whitespace-nowrap"
            style={{
              fontSize: 10,
              fontWeight: 400,
              fontFamily: 'Epilogue',
              color: '#FFF',
            }}>
            + more
          </span>
        </div>
        <div className="text-[#EDEEF1] b2-bold">Export wallet</div>
        <p className="text-[#EDEEF1] label-regular">
          Backup your wallet anytime by exporting it and saving it in your{' '}
          <b>File Manager/Google Drive</b> etc.
        </p>
      </div>
    </div>
  );
};

const BackupRecovery: React.FC<{
  onDone: () => void;
  step: StepProps;
  deviceOS: string;
}> = ({ onDone, step, deviceOS }) => {
  const [openHowBackupDialog, setOpenHowBackupDialog] = useState(false);

  return (
    <div className="desc animate__animated animate__slideInUp animate__faster">
      <Layout disabled={true} step={step} className="h-max">
        <div className="flex full-w justify-between mt-4">
          <div className="text-white-primary h2-bold">Don’t forget to backup</div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setOpenHowBackupDialog(true)}>
            <svg
              className="mr-1"
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
            <div className="text-indigo-custom b2-md">How Silent Account backup works</div>
          </div>
        </div>
        <p className="my-2 text-[#B6BAC3] b2-regular">
          Your wallet is just a click away! Before you finish up, don&apos;t forget to back up your
          Silent Account.
        </p>
        <BackupContent deviceOS={deviceOS} />
        <Button
          className="max-sm:p-8 w-full lg:w-1/2 bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active self-center mt-8 text-white-primary btn-lg"
          onClick={onDone}>
          I understand
        </Button>
      </Layout>
      <Dialog open={openHowBackupDialog} onOpenChange={setOpenHowBackupDialog}>
        <DialogContent
          className="flex flex-col items-center justify-center pt-6 pb-12 px-8 w-[49.5vw] bg-[#121212] border-none outline-none md:h-[40%] max-w-[650px]"
          showCloseBtn={true}>
          <div className="mt-4 text-center text-white-primary h2-bold">
            How Silent Account backup works
          </div>
          <div className="mt-2 text-center text-[#EDEEF1] b1-regular">
            When you backup, your browser Key is encrypted with the MetaMask entropy and appended to
            your Mobile Key, keeping them individually secure, to your backup option of choice.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackupRecovery;
