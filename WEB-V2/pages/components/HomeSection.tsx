import React, { useEffect, useState, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import { wordOfDay, getAutocompleteSuggestions } from "@/utils/api-service";
import { setSearchQuery, setSearchResults } from "@/store/wordSlice";

interface SearchResult {
  id: number;
  word: string;
  eyuo?: string;
  definitions?: {
    partOfSpeech: string;
    definition: string;
    exampleInNative: string;
    exampleEnglish: string;
    exampleNative: string;
  }[];
  suggestedWords?: string[];
  moreExamples?: {
    english: string;
    native: string;
  }[];
}

interface Word {
  word: string;
  meaning: string;
  photo: {
    url: string;
    type: "photo" | string;
  };
}

function HomeSection() {
  const [word, setWord] = useState<Word>({
    word: "",
    meaning: "",
    photo: {
      url: "/images/dish.svg",
      type: "photo",
    },
  });
  const router = useRouter();
  const { token } = useAppSelector((state) => state.signin);
  const { searchQuery, searchResults, isLoading, error } = useAppSelector(
    (state) => state.word,
  );
  const dispatch = useAppDispatch();

  const { t } = useTranslation("common");

  const handleSearchChange = (query: string): void => {
    dispatch(setSearchQuery(query));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      // If there are search results, navigate to the first result
      if (searchResults.length > 0) {
        router.push({
          pathname: `/word-display`,
          query: { term: searchResults[0].word },
        });
      } else {
        // Otherwise navigate with the search query
        router.push({
          pathname: `/word-display`,
          query: { term: searchQuery },
        });
      }
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        dispatch(setSearchResults([]));
        return;
      }
      const suggestions = await getAutocompleteSuggestions(searchQuery, token);
      if (suggestions) {
        dispatch(setSearchResults(suggestions));
      }
    };

    const debounceTimeout = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions();
      }
    }, 50);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, token, dispatch]);

  const handleWordOfDay = async () => {
    const res = await wordOfDay(dispatch);
    if (res.success) {
      setWord(res.word.word_of_day);
    } else {
      setWord({
        word: "",
        meaning: "",
        photo: {
          url: "/images/dish.svg",
          type: "photo",
        },
      });
    }
  };

  useEffect(() => {
    handleWordOfDay();
  }, []);

  const handleWordClick = (wordData: SearchResult) => {
    router.push({
      pathname: `/word-display`,
      query: { term: wordData.word },
    });
  };

  return (
    <main className="container mx-auto my-10 flex-col px-4 py-8">
      {/* Logo */}
      <div className="flex justify-center items-center">
        <h2 className="text-[5rem] md:text-[6rem] text-[#05353A] font-bold">
          Guọnọ
        </h2>
      </div>

      {/* Search Bar */}
      <div className="max-w-[400px] md:max-w-[745px] mx-auto my-4">
        <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-[4px_4px_16px_0px_#00000026] focus-within:ring-2 focus-within:ring-[#05353A] mb-8">
          <Image
            src="/icons/search-icon.svg"
            alt={t("Search")}
            width={20}
            height={20}
          />
          <input
            type="text"
            id="search"
            placeholder={t("Search Guọnọ")}
            className="w-full outline-none focus:outline-none focus:ring-0 focus:border-fore-background"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim() !== "" && searchResults.length > 0 && (
          <div className="relative z-50 w-full max-w-[645px] mx-auto bg-[#0A2E30] rounded-xl shadow-lg ">
            {isLoading ? (
              <div className="p-4 text-gray-200 text-center">Loading...</div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 text-gray-100 cursor-pointer transition-all duration-200 ease-in-out
               hover:bg-[#1C4A4D] hover:text-white hover:shadow-md hover:scale-[1.02] rounded-lg mx-1 my-1"
                    onClick={() => handleWordClick(result)}
                  >
                    <div className="font-semibold text-base">{result.word}</div>
                    {result.eyuo && (
                      <div className="text-sm text-gray-400 group-hover:text-gray-200">
                        {result.eyuo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">{error}</div>
        )}
      </div>

      {/* Conditional rendering based on search */}
      {searchQuery.trim() === "" ? (
        <section className="max-w-[645px] mx-auto bg-[#05353A] text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl text-center font-semibold mb-2">
            {t("Word of the day")}
          </h2>
          <hr className="border-[#F5DEB366] my-4" />
          <article className="flex flex-row md:flex-row justify-between items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-[24px] font-medium mb-3">
                {word.word}
              </h3>
              <p className="mb-4">{word.meaning}</p>
              <div className="flex space-x-3">
                <button className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/icons/download.svg"
                    alt="Download"
                    width={20}
                    height={20}
                  />
                </button>
                <button className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/icons/love.svg"
                    alt="Favorite"
                    width={20}
                    height={20}
                  />
                </button>
                <button className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/icons/speak.svg"
                    alt="Play pronunciation"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:w-1/3 flex justify-center">
              <Image
                src={word?.photo?.url || "/images/dish.svg"}
                alt="Word illustration"
                width={110}
                height={110}
                className="rounded-lg"
              />
            </div>
          </article>
        </section>
      ) : (
        searchResults.length === 0 &&
        !isLoading && (
          <div className="max-w-[645px] mx-auto">
            <p className="text-gray-600 text-center py-8">
              {t("No results found")}
            </p>
          </div>
        )
      )}
    </main>
  );
}

export default HomeSection;
