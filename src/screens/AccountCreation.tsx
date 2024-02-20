// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import Layout, { StepProps } from '@/components/Layout';

interface AccountCreationProps {
  step: StepProps;
  disableBackward: boolean;
}

const AccountCreation: React.FC<AccountCreationProps> = ({ step, disableBackward }) => {
  return (
    <div className="desc animate__animated animate__slideInUp animate__faster">
      <Layout disabled={disableBackward} step={step} className="h-max md:w-[50%]">
        <h2 className="text-white-primary leading-[38.4px] mt-4 h2-bold">Your phone is paired!</h2>
        <p className="text-[#B6BAC3] my-8 b2-regular">
          Click on <span className="text-white-primary b2-bold">Create</span> and then{' '}
          <span className="text-white-primary b2-bold">Ok</span> on MetaMask popup window to finish
          creating your Silent Shard Snap account.
        </p>
        <div className="flex flex-1 justify-center items-start">
          <img src="/v2/phone_paired.gif" alt="phone_paired" className="h-[50vh]" />
        </div>
      </Layout>
    </div>
  );
};

export default AccountCreation;
