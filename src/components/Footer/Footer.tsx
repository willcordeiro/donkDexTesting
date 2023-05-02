import React from 'react'
import { discord, github, m, twitter } from '../../assets'
import '../../index.css'

export default function Footer() {
  return (
    <footer className="py-24 dark:bg-dark400 dark:text-dark900">
      <div className="max-w-6xl w-[90%] mx-auto flex items-start justify-between gap-8 flex-wrap">
        <ul>
          <li className="font-bold text-xl mb-4 dark:text-white">Need help?</li>

          <li className="mb-5 text-sm font-medium">
            Join{' '}
            <a
              target="_blank"
              href="https://discord.gg/c5SnGZWUF8"
              className="text-orange500 hover:underline"
              rel="noreferrer"
            >
              our official Discord
            </a>{' '}
            for dedicated support
          </li>
          <li className="mb-5">
            <ul className="flex items-center gap-3 justify-between w-full">
              <li className="w-10 h-10 rounded-full  p-2">
                <a target="_blank" href="https://discord.gg/c5SnGZWUF8" rel="noreferrer">
                  <img src={discord} alt="discord" />
                </a>
              </li>
              <li className="w-10 h-10 rounded-full  p-2">
                <a target="_blank" href="https://twitter.com/donksol?s=21&t=H840g90JZa4v2LPWSf689Q" rel="noreferrer">
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li className="w-10 h-10 rounded-full ">
                <a href="/">
                  <img src={m} alt="m" />
                </a>
              </li>
              <li className="w-10 h-10 rounded-full  p-1">
                <a href="/">
                  <img src={github} alt="github" />
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <ul>
          <li className="font-semibold mb-2 dark:text-white">Business</li>
          <li className="hover:underline mb-2 text-sm">
            <a href="mailto:donkcoin.relations@gmail.com">Apply for Partnership</a>
          </li>
          <li className="hover:underline mb-2 text-sm">
            <a href="mailto:donkcoin.relations@gmail.com">Token Listing</a>
          </li>
          <li className="hover:underline mb-2 text-sm">
            <a href="mailto:donkcoin.relations@gmail.com">NFT Listing</a>
          </li>
          <li className="hover:underline mb-2 text-sm">
            <a href="mailto:donkcoin.relations@gmail.com">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
