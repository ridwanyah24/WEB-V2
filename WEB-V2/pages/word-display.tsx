import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getWordDetails, getAutocompleteSuggestions } from "@/utils/api-service";
import { RootState } from "@/store/store";
import { setSearchQuery, setSearchResults, WordRecord } from "@/store/wordSlice";
import { RiLoader2Fill } from "react-icons/ri";
import WordDetailsHeader from "./components/WordDetailsHeader";

const WordDisplay = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { term } = router.query;
  const token = useSelector((state: RootState) => state.signin.token);
  const { detailedWord, isLoading, error, searchQuery } =
    useSelector((state: RootState) => state.word);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (query: string): void => {
    dispatch(setSearchQuery(query));
  };

  const handleWordClick = (wordData: WordRecord) => {
    router.push({
      pathname: `/word-display`,
      query: { term: wordData.word },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        dispatch(setSearchQuery(""));
        dispatch(setSearchResults([]));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    if (term && token) {
      getWordDetails(term as string, token, dispatch);
    }
  }, [term, token, dispatch]);

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

    fetchSuggestions();
  }, [searchQuery, token, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RiLoader2Fill className="animate-spin text-3xl text-[#05353A]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const records = detailedWord?.records || [];
  console.log('records', records);

  return (
    <div className="min-h-screen bg-[#f2feff]">
      {/* Navbar - Modernized */}
      <WordDetailsHeader
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        isLoading={isLoading}
        handleWordClick={handleWordClick}
        searchRef={searchRef}
      />

      {/* Main Content - Modern Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="rounded-lg shadow-sm border-2 max-w-[80rem] mx-auto border-[#05353a] overflow-hidden mb-6">
            <div className="p-6">
              {records.map((record, recordIndex) => (
                <div key={recordIndex} className="mb-12">
                  {/* Word + Translation + Part of Speech */}
                  {record.meanings?.map((meaning, meaningIndex) => {
                    const isEnglish = record.language === "english";
                    const translation = isEnglish
                      ? record.translations?.urh?.[meaningIndex]
                      : record.translations?.en?.[meaningIndex];

                    return (
                      <div key={meaningIndex} className="mb-6">
                        {/* Header Line */}
                        <div className="flex lg:gap-5 gap-5 items-start mb-4">
                          <span className="mr-2 bg-[#05353a30] px-4 py-2 text-[#05353a] font-bold rounded-full">{meaningIndex + 1}</span>
                          <div className="mt-2">
                            <h2 className="text-xl font-bold text-[#05353A] flex items-center">

                              <p className="capitalize text-lg"> {meaning.word}{" "}</p>
                              <span className="text-sm capitalize text-[#05353a] ml-2">
                                ({meaning.partOfSpeech?.[0]})
                              </span>
                              <span className="mx-2">–</span>
                              <span className="font-semibold text-lg">
                                {translation?.word || ""}
                              </span>
                            </h2>

                            {/* Definitions */}
                            {meaning.definitions?.length > 0 && (
                              <div className="mt-2 ml-6">
                                <h3 className="font-semibold text-[#05353A]">Definition</h3>
                                {meaning.definitions.map((definition, defIndex) => (
                                  <div key={defIndex} className="mb-2">
                                    {/* English definition */}
                                    <p className="text-gray-700 italic ml-4">{definition}</p>

                                    {/* Urhobo translation of this definition */}
                                    {translation?.definitions?.[defIndex] && (
                                      <p className="text-gray-500 italic ml-4">
                                        {translation.definitions[defIndex]}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Examples */}
                            {meaning.examples?.length > 0 && (
                              <div className="mt-3 ml-6">
                                <h3 className="font-semibold text-[#05353A]">Examples</h3>
                                {meaning.examples.map((example, exIndex) => (
                                  <div key={exIndex} className="mb-2 ml-4">
                                    <p className="text-gray-700 font-medium ">
                                      {exIndex + 1}. {example}
                                    </p>
                                    {translation?.examples?.[exIndex] && (
                                      <p className="text-gray-500 italic ml-6 font-medium m">
                                        {translation.examples[exIndex]}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Synonyms */}
                            {meaning.synonyms?.length > 0 && (
                              <div className="mt-3 ml-6">
                                <h3 className="font-semibold text-[#05353A]">Synonyms</h3>
                                <div className="flex flex-wrap gap-2 mt-1 ml-4">
                                  {meaning.synonyms.map((syn, synIndex) => (
                                    <span
                                      key={synIndex}
                                      className="px-3 py-1 text-sm bg-gray-100 text-[#05353A] rounded-full"
                                    >
                                      {syn.word}
                                    </span>
                                  ))}
                                  {translation?.synonyms?.map((tsyn, tsynIndex) => (
                                    <span
                                      key={`tsyn-${tsynIndex}`}
                                      className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded-full"
                                    >
                                      {tsyn.word}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WordDisplay.requiresAuth = true;

export default WordDisplay;
