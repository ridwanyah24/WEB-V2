import React from 'react'
import Navbar from './layouts/Navbar'
import { WordRecord } from '@/store/wordSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface WordDetailsHeaderProps {
    searchQuery: string;
    handleSearchChange: (query: string) => void;
    isLoading: boolean;
    handleWordClick: (word: WordRecord) => void;
    searchRef: React.RefObject<HTMLDivElement | null>;
}

const WordDetailsHeader: React.FC<WordDetailsHeaderProps> = ({ 
    searchQuery, 
    handleSearchChange, 
    isLoading, 
    handleWordClick,
    searchRef
}) => {

    const { searchResults } = useSelector((state: RootState) => state.word);

  return (
    <header className="bg-[#f2feff] py-2 sticky top-0 z-10">
    <div className=" mx-auto px-4 flex justify-between items-center space-x-4">
      <div className="flex items-center space-x-8">
        <Link
          href="/home"
          className="hidden md:block hover:opacity-90 transition-opacity"
        >
          <Image
            src="/guọnọ-logo.svg"
            alt="guọnọ-logo"
            width={90}
            height={30}
            aria-label="Guọnọ logo"
          />
        </Link>

        <div ref={searchRef} className="relative">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-[#05353a] bg-fore-background focus-within:ring focus-within:ring-[#05353A]/50  transition-all duration-200">
            <Image
              src="/icons/search-icon.svg"
              alt="Search icon"
              width={18}
              height={18}
              className="opacity-60"
            />
            <input
              id="search"
              type="text"
              placeholder="Search Guọnọ"
              className="w-full outline-none bg-fore-background placeholder:text-gray-400 text-[#05353A]"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/**search dropdown */}
          {searchQuery.trim() !== "" && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleWordClick(result as WordRecord)}
                    >
                      <div className="font-medium text-[#05353A]">
                        {result.word}
                      </div>
                      {result.eyuo && (
                        <div className="text-sm text-gray-500 mt-1">
                          {result.eyuo}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No matches found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  </header>
  )
}

export default WordDetailsHeader