import React, { useContext, useEffect, useState } from "react";
import UseLanguageFilterComboBox from "./UseLanguageFilterComboBox";
import { LucideLoaderCircle } from "lucide-react";
import { UserSessionContext } from "@/types/context";
import { PrivacySettingResponse } from "@/types/response";
import { PrivacySetting } from "@/types/setting";

interface PrivacySettingProps {
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose: (open: boolean) => void;
}

const PrivacySettingComponent = (props: PrivacySettingProps) => {
  const { hasChanges, setHasChanges, onModalClose } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [useBadWordFilterValue, setUseBadWordFilterValue] =
    useState<string>("");
  const userSessionContext = useContext(UserSessionContext);

  useEffect(() => {
    if (userSetting?.privacy_setting.use_bad_word_filter)
      setUseBadWordFilterValue("yes");
    else setUseBadWordFilterValue("no");

    return () => {
      if (userSetting?.privacy_setting.use_bad_word_filter)
        setUseBadWordFilterValue("yes");
      else setUseBadWordFilterValue("no");
    };
  }, []);

  async function onSaveChanges() {
    if (!userSetting) return;

    try {
      setIsSaving(true);
      const requestBody = {
        use_bad_word_filter: useBadWordFilterValue === "yes" ? true : false,
      } as PrivacySetting;

      const res = await fetch(`/dashboard/api/setting/privacy-setting`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });

      const data: PrivacySetting = await res.json();
      if (res.status === 200) {
        if (data.use_bad_word_filter) setUseBadWordFilterValue("yes");
        else setUseBadWordFilterValue("no");

        let newSetting = userSetting;
        newSetting.privacy_setting = data;
        setUserSetting(newSetting);
        setHasChanges(false);
        console.log("Response :" + data);
      } else {
        console.log("Response :" + JSON.stringify(data));
      }
    } catch (error) {
      console.log("Error: " + error);
    }
    setIsSaving(false);
  }

  if (!userSessionContext) return <div>No user setting in context</div>;
  const { userSetting, setUserSetting } = userSessionContext;

  return (
    <section className="size-full flex flex-col justify-between py-[16px]">
      <div className="size-full flex flex-row">
        <div className="bg-dark-2 w-[96%] h-fit rounded-[6px] px-[16px] py-[12px] mx-auto flex flex-col">
          <div className="flex flex-row justify-between items-center text-gray-2 text-[14px]">
            <p>Bad language filter:</p>
            <UseLanguageFilterComboBox
              setHasChanges={setHasChanges}
              value={useBadWordFilterValue}
              setValue={setUseBadWordFilterValue}
            />
          </div>
        </div>
      </div>
      {hasChanges && (
        <div className=" h-[50px] bg-dark-10 mt-[12px] p-[10px] px-[16px] mx-[11px] rounded-[8px] flex flex-row justify-between">
          <p className="text-[13px] max-sm:text-[12px] w-fit text-white font-bold self-center">
            You have unsaved changes!
          </p>

          <div className="flex flex-row">
            <button
              className="overflow-hidden text-[13px] max-sm:text-[12px] h-auto mr-[12px] px-[16px] py-[2px] bg-red-700 hover:bg-red-800 rounded-[3px]"
              onClick={() => onModalClose(false)}
            >
              Cancel
            </button>
            <button
              className="px-[16px] py-[2px] text-center overflow-hidden text-[13px] max-sm:text-[12px] bg-green-700 hover:bg-green-800 transition rounded-[3px] flex"
              onClick={onSaveChanges}
            >
              {isSaving && (
                <LucideLoaderCircle className="animate-spin size-[15px] mr-[6px] self-center" />
              )}{" "}
              <span className="self-center m-auto">
                Save
                <span className="max-lg:hidden inline-block pl-[0.25em]">
                  {"Changes"}
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PrivacySettingComponent;
