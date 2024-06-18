// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import debounce from 'debounce';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

interface WrongTimezoneProps {
  onRetryClick: () => void;
}

const WrongTimezone: React.FC<WrongTimezoneProps> = ({ onRetryClick }) => {
  return (
    <div className="desc animate__animated animate__slideInUp animate__faster">
      <Layout className="h-max w-full">
        <div className="flex-1 flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none">
            <rect
              x="117.461"
              y="46.7422"
              width="54.8413"
              height="22.0993"
              rx="11.0497"
              transform="rotate(-45.105 117.461 46.7422)"
              fill="#E3D588"
            />
            <path
              d="M112.819 166.426V166.415L112.818 166.403C112.764 165.191 112.416 164.247 111.869 163.523C111.324 162.802 110.607 162.332 109.862 162.026C108.402 161.426 106.765 161.426 105.911 161.426H105.89H98.1758C96.8951 161.426 95.4078 161.323 94.2468 160.654C93.1404 160.016 92.2472 158.814 92.2472 156.391C92.2472 154.231 93.0804 153.047 94.1045 152.377C95.1641 151.684 96.4972 151.497 97.5329 151.497H125.176C126.621 151.497 127.888 151.482 128.97 151.379C130.048 151.277 130.982 151.085 131.745 150.709C132.525 150.324 133.112 149.753 133.494 148.933C133.869 148.129 134.033 147.114 134.033 145.854C134.033 144.566 133.779 143.546 133.338 142.746C132.896 141.943 132.282 141.389 131.607 141.012C130.28 140.269 128.717 140.211 127.747 140.211C126.801 140.211 125.474 140.111 124.393 139.447C123.357 138.81 122.461 137.601 122.461 135.177C122.461 132.765 123.4 131.592 124.46 130.985C125.57 130.35 126.9 130.283 127.747 130.283H146.39C150.522 130.283 152.721 127.494 152.84 124.661C152.899 123.257 152.447 121.838 151.464 120.766C150.475 119.688 148.982 118.997 147.033 118.997H127.747C124.568 118.997 122.414 118.572 121.007 117.919C119.618 117.274 118.975 116.418 118.75 115.519C118.519 114.594 118.707 113.533 119.167 112.462C119.622 111.4 120.323 110.376 121.044 109.55C126.835 103.545 140.58 89.3716 149.315 80.6365C153.728 76.2237 155.671 72.5517 156.265 69.714C156.86 66.8766 156.103 64.8598 155.101 63.8579L119.744 28.5005C116.591 25.3482 113.692 24.2032 111.309 24.1115C108.936 24.0203 107.131 24.977 106.179 25.929C101.467 30.6414 87.926 44.0538 71.4707 59.9949C61.098 70.0434 57.8172 79.8138 57.899 88.2428C57.9807 96.651 61.4076 103.655 64.3266 108.196C66.5738 111.691 66.4576 114.173 65.5597 115.854C64.6521 117.554 62.8728 118.578 61.4616 118.997H14.6044C13.3031 118.997 11.5824 119.126 10.1763 119.935C8.72034 120.773 7.67578 122.297 7.67578 124.891C7.67578 126.109 7.99639 127.079 8.52958 127.841C9.05975 128.598 9.77899 129.119 10.533 129.476C12.0275 130.185 13.7247 130.283 14.6044 130.283H33.8901C35.4437 130.283 36.929 130.596 38.014 131.391C39.0721 132.167 39.8186 133.453 39.8186 135.569C39.8186 137.183 39.0599 138.278 38.0888 139.011C37.1137 139.747 35.9335 140.108 35.1438 140.211H26.8186H26.7789C25.5149 140.211 23.6594 140.211 22.1156 140.897C21.3211 141.251 20.5939 141.791 20.0692 142.612C19.5452 143.432 19.2472 144.495 19.2472 145.854C19.2472 148.064 20.122 149.509 21.393 150.381C22.6337 151.232 24.1944 151.497 25.5329 151.497H49.3186C50.9471 151.497 52.9388 151.503 54.5246 152.107C55.305 152.405 55.9586 152.837 56.4193 153.463C56.8776 154.086 57.1758 154.941 57.1758 156.14C57.1758 158.008 56.3148 159.143 55.2366 159.833C54.1315 160.541 52.7853 160.783 51.8901 160.783H44.8186C44.7489 160.783 44.6775 160.783 44.6048 160.783C43.3779 160.78 41.7487 160.777 40.4126 161.459C39.6851 161.831 39.0438 162.403 38.5902 163.267C38.1405 164.123 37.8901 165.238 37.8901 166.677C37.8901 168.183 38.1704 169.344 38.6713 170.229C39.176 171.12 39.8852 171.699 40.6793 172.067C42.0975 172.726 43.8141 172.718 45.1195 172.713C45.237 172.712 45.3512 172.711 45.4615 172.711H105.247C108.153 172.711 110.092 172.299 111.286 171.232C112.501 170.147 112.819 168.503 112.819 166.426Z"
              fill="#4A408D"
              stroke="#C5C8FF"
            />
            <path
              d="M118.46 112.844C93.7229 128.713 72.3728 117.334 65.6411 109.48C66.1154 110.56 66.5301 111.369 66.6657 113.217C86.2876 132.77 100.824 128.498 103.352 128.498C105.881 128.498 110.727 128.995 110.727 135.873C110.727 141.374 106.028 142.82 103.679 142.856H95.5745C93.3785 142.856 82.8692 144.058 82.5554 156.084C82.3045 165.705 89.2567 171.573 93.864 172.141H101.851C101.851 172.141 108.001 172.397 110.163 171.305C111.334 170.714 112.58 169.191 112.375 166.966C112.257 165.679 112.222 164.425 110.98 163.286C109.694 162.105 106.688 161.964 106.688 161.964H101.577C98.9719 161.964 96.3951 162.172 94.0705 161.078C92.7444 160.453 92.1144 159.341 91.8695 157.978C91.6052 156.508 91.7913 155.042 92.0512 154.467C92.6016 153.249 92.8014 152.414 94.2021 151.805C96.4336 150.835 100.823 150.995 100.823 150.995C100.823 150.995 114.024 150.982 124.883 150.982C128.028 150.982 131.221 151.057 132.625 149.419C133.509 148.388 133.632 146.985 133.607 145.589C133.578 144.021 133.353 142.733 132.532 141.719C131.625 140.6 128.987 140.697 128.987 140.697C128.987 140.697 126.664 140.619 126.098 140.55C124.6 140.366 123.559 139.685 122.884 138.647C122.124 137.478 121.896 136.273 121.97 134.478C121.999 133.773 122.329 132.333 123.018 131.556C123.817 130.655 124.942 129.799 126.967 129.799H134.1L144.66 129.737C144.66 129.737 149.384 130.133 150.945 128.077C152.525 125.997 152.845 122.732 151.173 121.015C149.501 119.297 146.49 119.542 146.49 119.542H126.776C119.206 119.542 117.685 116.128 118.46 112.844Z"
              fill="#392F78"
            />
            <rect
              x="97.1304"
              y="41.6133"
              width="19.6397"
              height="2.5978"
              rx="1.2989"
              transform="rotate(-44.2899 97.1304 41.6133)"
              fill="white"
            />
            <rect
              x="143.413"
              y="23.207"
              width="10.4898"
              height="2.5978"
              rx="1.2989"
              transform="rotate(-44.2899 143.413 23.207)"
              fill="white"
            />
            <rect
              x="94.2617"
              y="44.4453"
              width="2.64719"
              height="2.5978"
              rx="1.2989"
              transform="rotate(-44.2899 94.2617 44.4453)"
              fill="white"
            />
            <rect
              x="140.544"
              y="26.0391"
              width="2.64719"
              height="2.5978"
              rx="1.2989"
              transform="rotate(-44.2899 140.544 26.0391)"
              fill="white"
            />
          </svg>
          <div className="text-white-primary my-6 text-center b1-md">
            Oops! It looks like your Date & Time settings need a quick adjustment
          </div>
          <div className="text-white-primary my-4 b2-regular text-center">
            Please click on the below link to know how to adjust your device date & time
          </div>
          <a
            href="https://support.microsoft.com/en-us/windows/how-to-set-your-time-and-time-zone"
            target="_blank"
            rel="noreferrer"
            className="text-[#867DFC] underline mb-8 b2-regular text-center">
            https://support.microsoft.com/en-us/windows/how-to-set-your-time-and-time-zone
          </a>
          <Button
            className="max-sm:p-8 w-3/4 bg-indigo-primary hover:bg-indigo-hover active:bg-indigo-active self-center text-white-primary btn-lg mb-8"
            onClick={debounce(onRetryClick, 1000)}>
            Try again
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default WrongTimezone;
