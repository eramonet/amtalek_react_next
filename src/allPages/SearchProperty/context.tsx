import React, { createContext, useContext, useState } from "react";

// إنشاء السياق
const SearchContext = createContext<any>({});

// إنشاء المزود (Provider)
export const SearchProvider = ({ children }: any) => {
  const [queryParams, setQueryParams] = useState(
    "k=&cr=1&r=-1&c=-1&sr=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=0&cur=&page=1"
  );

  // تحديث القيم في localStorage عند تغيير queryParams
  const updateQueryParams = (newParams: any) => {
    setQueryParams(newParams);
    localStorage.setItem("queryParams", newParams);
  };

  return (
    <SearchContext.Provider value={{ queryParams, updateQueryParams }}>
      {children}
    </SearchContext.Provider>
  );
};

// دالة مخصصة لاستهلاك السياق بسهولة
export const useSearchContext = () => useContext(SearchContext);
