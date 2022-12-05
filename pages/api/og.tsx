import { ImageResponse } from '@vercel/og';

// import Bg from '../../public/assets/bg.svg';

export const config = {
  runtime: 'experimental-edge',
};

export default function (req: any) {

  if (!req.nextUrl.searchParams.get) {
    return;
  }

  const { searchParams } = req.nextUrl;

  const image = searchParams.has('image') ? searchParams.get('image') : '';
  const username = searchParams.has('username') ? searchParams.get('username') : '';

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center bg-white relative">
        <div tw="flex p-8 w-full justify-center bg-emerald-100">
          {image && (
            <img src={image} alt="User image" width={176} height={176} tw="rounded-full border-2 border-neutral-800 p-1 bg-white" />
          )}
        </div>
        <div tw="w-full h-20 bg-white flex justify-center items-center relative z-40">
          <img src={`${process.env.HOST}/down-wave-1.svg`} alt="Down Wave" tw="absolute -top-2 w-full " style={{ objectFit: "cover" }} />
          <h3 tw="font-normal text-lg tracking-wide">@{username}</h3>
          <img src={`${process.env.HOST}/up-wave-1.svg`} alt="Up Wave" tw="absolute top-12 w-full" style={{ objectFit: "cover" }} />
        </div>
        <div tw="flex w-full justify-center bg-emerald-100">
          <img src={`${process.env.HOST}/bg.png`} alt="FiF bridge" tw="mt-8 w-full" style={{ objectFit: "cover" }} />
        </div>
        <div tw="flex w-full h-4 bg-white" />
      </div>
    ),
    {
      width: 280,
      height: 443,
    },
  );
}