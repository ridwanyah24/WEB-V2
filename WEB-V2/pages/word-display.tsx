import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {getWordDetails, getAutocompleteSuggestions} from "@/utils/api-service";
import { RootState } from "@/store/store";
import { setSearchQuery, setSearchResults, WordRecord} from "@/store/wordSlice";
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
      <main className="max-w-[90rem] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Sticky */}

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="rounded-lg shadow-sm border-2 border-[#05353a] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
               <div className="flex items-center space-x-4">
                 <h2 className="text-3xl font-bold text-[#05353A]">
                   {(() => {
                     const exactMeaning = records
                       .flatMap(record => record.meanings || [])
                       .find(meaning => 
                         meaning.word?.toLowerCase() === (term as string).toLowerCase()
                       );
                     
                     if (!exactMeaning) return term;
                     
                     const exactRecord = records.find(record => 
                       record.meanings?.some(meaning => 
                         meaning.word?.toLowerCase() === (term as string).toLowerCase()
                       )
                     );
                     
                     const isEnglish = exactRecord?.language === 'english';
                     const translation = isEnglish 
                       ? exactRecord?.translations?.urh?.[0] 
                       : exactRecord?.translations?.en?.[0];
                     
                     return translation?.word || term;
                   })()}
                 </h2>
                 <button className="p-2 bg-[#F5DEB3] rounded-full hover:bg-[#F5DEB3]/50 transition-colors">
                   <Image
                     src="/icons/speaker.svg"
                     width={20}
                     height={20}
                     alt="Play pronunciation"
                   />
                 </button>
               </div>
             </div>

              {/* Meaning */}
              {(() => {
                const exactMeaning = records
                  .flatMap(record => record.meanings || [])
                  .find(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  );
                
                if (!exactMeaning) return null;
                
                const exactRecord = records.find(record => 
                  record.meanings?.some(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  )
                );
                
                const isEnglish = exactRecord?.language === 'english';
                const translation = isEnglish 
                  ? exactRecord?.translations?.urh?.[0] 
                  : exactRecord?.translations?.en?.[0];
                
                return (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#05353A] mb-4">Meaning</h3>
                    <div className="space-y-4">
                      {exactMeaning.definitions?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-[#05353A] mb-2">Definition</h4>
                          <div className="text-gray-700">
                            {exactMeaning.definitions.map((definition: string, index: number) => (
                              <p key={index} className="mb-2">{index + 1}. {definition}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {translation?.definitions && translation.definitions.length > 0 && (
                        <div>
                          <div className="text-gray-700">
                            {translation.definitions.map((definition: string, index: number) => (
                              <p key={index} className="mb-2">{definition}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Part of Speech */}
              <div className="px-6">
                <div className="">
                <h3 className="text-lg font-semibold text-[#05353A] mb-4">Part of Speech</h3>
                   {(() => {
                     const allMeanings = records.flatMap(record => {
                       const meanings = record?.meanings || [];
                       return meanings
                         .filter(meaning => meaning.word?.toLowerCase() === (term as string).toLowerCase())
                         .map(meaning => ({
                           meaning,
                           record,
                           translation: record?.language === 'english' 
                             ? record?.translations?.urh?.[meanings.indexOf(meaning)]
                             : record?.translations?.en?.[meanings.indexOf(meaning)]
                         }));
                     });
                     
                     const uniqueMeanings = allMeanings.filter((item, index, self) => 
                       index === self.findIndex(m => 
                         m.record.word === item.record.word && 
                         m.meaning.definitions?.[0] === item.meaning.definitions?.[0]
                       )
                     );
                     
                     return uniqueMeanings.map((item, index) => (
                       <div key={index} className="flex items-start flex-col space-x-3">
                         <div className="">
                           <span className="text-sm capitalize">
                             {item.meaning.partOfSpeech?.[0]}
                           </span>
                           <span className="text-gray-600 mx-1">-</span>
                           <button className="font-medium">
                             {item.translation?.word || item.meaning.word}
                           </button>
                         </div>
                         {item.meaning?.definitions && (
                           <p className="text-gray-500 text-sm italic">
                             {item.meaning.definitions[0]}
                           </p>
                         )}
                       </div>
                     ));
                   })()}
                 </div>
              </div>

              {/* Examples */}
              {(() => {
                const exactMeaning = records
                  .flatMap(record => record.meanings || [])
                  .find(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  );
                
                if (!exactMeaning || !exactMeaning.examples?.length) return null;
                
                const exactRecord = records.find(record => 
                  record.meanings?.some(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  )
                );
                
                const isEnglish = exactRecord?.language === 'english';
                const translation = isEnglish 
                  ? exactRecord?.translations?.urh?.[0] 
                  : exactRecord?.translations?.en?.[0];
                
                return (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#05353A] mb-4">Examples</h3>
                    <div className="space-y-4">
                      {exactMeaning.examples.map((example: string, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <span className="text-sm text-[#05353A] font-medium mt-1">
                              {index + 1}.
                            </span>
                            <p className="text-gray-700 flex-1">{example}</p>
                          </div>
                          {translation?.examples?.[index] && (
                            <div className="ml-6">
                              <p className="text-sm text-gray-500 italic">
                                {translation.examples[index]}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Synonyms */}
              {(() => {
                const exactMeaning = records
                  .flatMap(record => record.meanings || [])
                  .find(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  );
                 
                if (!exactMeaning || !exactMeaning.synonyms?.length) return null;
                 
                const exactRecord = records.find(record => 
                  record.meanings?.some(meaning => 
                    meaning.word?.toLowerCase() === (term as string).toLowerCase()
                  )
                );
                 
                const isEnglish = exactRecord?.language === 'english';
                const translation = isEnglish 
                  ? exactRecord?.translations?.urh?.[0] 
                  : exactRecord?.translations?.en?.[0];
                 
                return (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#05353A] mb-4">Synonyms</h3>
                    <div className="space-y-4">
                      {exactMeaning.synonyms.map((synonym, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 text-sm bg-gray-100 text-[#05353A] rounded-full">
                              {synonym.word}
                            </span>
                          </div>
                          {translation?.synonyms?.[index] && (
                            <div className="ml-6">
                              <span className="text-sm text-gray-500 italic">
                                {translation.synonyms[index].word}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

WordDisplay.requiresAuth = true;

export default WordDisplay;
