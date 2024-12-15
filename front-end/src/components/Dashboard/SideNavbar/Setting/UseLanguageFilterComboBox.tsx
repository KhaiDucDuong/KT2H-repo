"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "@/types/context";

const data = [
  {
    value: "yes",
    label: "yes",
  },
  {
    value: "no",
    label: "no",
  },
];

interface UseLanguageFilterComboBoxProps {
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const UseLanguageFilterComboBox = (props: UseLanguageFilterComboBoxProps) => {
  const { setHasChanges, value, setValue } = props;
  const [open, setOpen] = useState(false);
  const userSessionContext = useContext(UserSessionContext);

  useEffect(() => {
    if (userSetting?.privacy_setting.use_bad_word_filter) setValue("yes");
    else setValue("no");
  }, []);

  if (!userSessionContext) return <div>No user setting in context</div>;
  const { userSetting, setUserSetting } = userSessionContext;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[32px] px-[12px] w-[80px] justify-between text-gray-2 bg-dark-7 rounded-[4px] border-gray-5 hover:bg-dark-7 hover:text-gray-2"
        >
          {value
            ? data.find((option) => option.value === value)?.label
            : "Select ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[80px] p-0 !border-gray-5">
        <Command>
          <CommandList>
            <CommandGroup className="bg-dark-7">
              {data.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    if (
                      userSetting?.privacy_setting.use_bad_word_filter !==
                      (currentValue === "yes" ? true : false)
                    )
                      setHasChanges(true);
                  }}
                  className=" text-gray-2"
                >
                  {option.label}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 to-blue-3",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UseLanguageFilterComboBox;
