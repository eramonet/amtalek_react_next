"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

export default function ComboBoz({
  width = "w-full",
  setValue,
  setSearchParams,
  stateName,
  placeholder,
  data,
  light,
  NotFoundMessage = "No data found",
  getDefaultValueFromURL,
  searchParams,
  selectBox,
  isSuccess,
  callBcFn,
  company_name,
  company_logo,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>("");

  useEffect(() => {
    if (isSuccess) {
      setSelectedLocation("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && searchParams) {
      const title = data?.find(
        (location: any) =>
          Number(location.id) === Number(searchParams.get(`${getDefaultValueFromURL}`))
      )?.title;

      if (title) {
        setSelectedLocation(title.toLowerCase());
      } else {
        setSelectedLocation(null);
      }
    }
  }, [data, getDefaultValueFromURL, searchParams]);

  const { i18n } = useTranslation();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`selected-location flex outline-none round justify-between w-full px-2 items-center gap-1 ${
            light ? "bg-grey" : "bg-bg"
          } w-full h-[42px] cursor-pointer ${selectedLocation ? "text-primary" : "text-secondary"}`}
        >
          <span
            className={`text-[0.9rem] text-secondary truncate ${
              selectedLocation ? "opacity-100" : "opacity-50"
            }`}
          >
            {selectedLocation
              ? data?.find((location: any) => location?.title?.toLowerCase() === selectedLocation)
                  ?.title
              : placeholder}
          </span>
          <ChevronsUpDown
            className={`transition-all text-[0.9rem] duration-200 ease-in-out ${
              selectedLocation ? "opacity-100" : "opacity-50"
            } ${open ? "rotate-180" : "rotate-0"}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className={`${light ? "bg-grey border-grey" : "bg-bg border-bg"}`}>
          <div
            className={`search-wrapper ${
              selectBox ? "h-0 opacity-0 pointer-events-none" : "h-12"
            } w-full shadow-sm shadow-slate-200 flex px-4 gap-5 items-center ${
              light ? "bg-grey justify-start" : "bg-bg justify-between"
            }`}
          >
            <FontAwesomeIcon
              className="text-xl text-secondary opacity-50"
              icon={faMagnifyingGlassLocation}
            />
            <CommandInput
              className={`outline-none text-sm font-normal text-secondary w-full 
                placeholder:text-sm placeholder:font-normal placeholder:text-secondary placeholder:opacity-50 ${
                  light ? "bg-grey" : "bg-bg"
                }`}
              autoFocus={!light}
              placeholder={`${i18n.language === "ar" ? "البحث في" : "Search"} ${placeholder}`}
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {i18n.language === "ar" ? "لا يوجد نتائج" : NotFoundMessage}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item: any) => (
                <CommandItem
                  className={`cursor-pointer text-lg hover:bg-secondary aria-selected:bg-secondary/60 
                    w-full truncate ${
                      light
                        ? "hover:text-grey aria-selected:text-grey"
                        : "hover:text-bg aria-selected:text-bg"
                    } ${
                    selectedLocation === item?.title?.toLowerCase()
                      ? "bg-secondary text-bg"
                      : "pl-8 rtl:pl-0 rtl:pr-8"
                  }`}
                  key={item.id}
                  value={item.title}
                  onSelect={(currentValue) => {
                    const normalizedValue = currentValue.toLowerCase();
                    setSelectedLocation(normalizedValue);
                    setValue(
                      stateName,
                      normalizedValue === selectedLocation ? "" : normalizedValue
                    );
                    setOpen(false);
                    if (callBcFn) {
                      callBcFn(normalizedValue);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation === item.title.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
