import CustomIcon from "../CustomIcon";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { BellIcon, LockKeyhole, SettingsIcon, XIcon } from "lucide-react";
import { ShowNavbarModalType } from "../SideNavbar";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { UserSessionContext } from "@/types/context";
import PrivacySettingComponent from "./PrivacySetting";

interface SettingModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<ShowNavbarModalType>>;
}

enum SettingOption {
  PRIVACY_SETTING,
  NOTIFICATION,
}

const SettingModal = (props: SettingModalProps) => {
  const { show, setShow } = props;
  const [selectedSettingOption, setSelectedSettingOption] =
    useState<SettingOption>(SettingOption.PRIVACY_SETTING);
  const [hasChanges, setHasChanges] = useState(false);

  function onModalClose(open: boolean) {
    if (open) return;
    resetStates();
    setShow(ShowNavbarModalType.NONE);
  }

  function resetStates() {
    setSelectedSettingOption(SettingOption.PRIVACY_SETTING);
    setHasChanges(false);
  }

  return (
    <section>
      <div
        onClick={() => {
          props.setShow(ShowNavbarModalType.SETTING);
        }}
      >
        <CustomIcon faIcon={faGear} fontSize={26} isSelected={false} />
      </div>
      <Dialog open={show} onOpenChange={onModalClose}>
        <DialogContent
          className="shadow-2xl ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 p-0 min-w-[780px] max-lg:min-w-[580px] bg-transparent"
          onInteractOutside={(e) => {
            if (hasChanges) e.preventDefault();
          }}
        >
          <div className="flex flex-col">
            <div className="w-full flex flex-row h-[56px]">
              <div className="w-[230px] h-full flex flex-col justify-center bg-dark-3 pl-[16px] rounded-tl-[4px] max-lg:w-[180px]">
                <p className="text-[18px] text-gray-2 font-bold">Settings</p>
              </div>
              <div className="w-[550px] bg-dark-6 flex justify-end pr-[16px] rounded-tr-[4px] max-lg:w-[400px]">
                <DialogTrigger
                  className="size-fit self-center"
                  disabled={hasChanges}
                >
                  <XIcon
                    className={cn(
                      "cursor-pointer size-[24px] text-gray-1 hover:text-white transition ",
                      hasChanges && "hover:text-gray-1 cursor-not-allowed"
                    )}
                  />
                </DialogTrigger>
              </div>
            </div>

            <div className="w-full h-fit flex flex-row">
              <div className="w-[230px] h-[200px] bg-dark-3 rounded-bl-[4px] max-lg:w-[180px]">
                <div
                  className={cn(
                    "pl-[16px] w-full h-[40px] flex flex-row items-center relative cursor-pointer hover:bg-dark-7 ",
                    selectedSettingOption === SettingOption.PRIVACY_SETTING &&
                      "bg-blue-4"
                  )}
                  onClick={() =>
                    setSelectedSettingOption(SettingOption.PRIVACY_SETTING)
                  }
                >
                  <LockKeyhole className="text-gray-2 size-[18px] absolute top-[10px]" />{" "}
                  <p className="text-gray-2 text-[14px] ml-[24px] font-bold">
                    Privacy Settings
                  </p>
                </div>

                <div
                  className={cn(
                    "pl-[16px] w-full h-[40px] flex flex-row items-center relative cursor-pointer hover:bg-dark-7 ",
                    selectedSettingOption === SettingOption.NOTIFICATION &&
                      "bg-blue-4"
                  )}
                  onClick={() =>
                    setSelectedSettingOption(SettingOption.NOTIFICATION)
                  }
                >
                  <BellIcon className="text-gray-2 size-[18px] absolute top-[10px]" />{" "}
                  <p className="text-gray-2 text-[14px] ml-[24px] font-bold">
                    Notifications
                  </p>
                </div>
              </div>
              <div className="w-[550px] h-[200px] bg-dark-6 rounded-br-[4px] flex flex-col max-lg:w-[400px]">
                {selectedSettingOption === SettingOption.PRIVACY_SETTING && (
                  <PrivacySettingComponent
                    hasChanges={hasChanges}
                    setHasChanges={setHasChanges}
                    onModalClose={onModalClose}
                  />
                )}
              </div>
            </div>
          </div>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SettingModal;
