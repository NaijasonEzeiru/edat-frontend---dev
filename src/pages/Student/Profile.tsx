import { Button } from "@/components/ui/button";
import { getInitialsFromFullName } from "@/lib/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateBioMutation } from "../../features/api/apiSlice";

const Index = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [updateBio, { isLoading }] = useUpdateBioMutation();

  const [bio, setBio] = useState();

  console.log(bio);

  const handleUpdate = async () => {
    try {
      const res = await updateBio({ id: userInfo?._id, bio: bio }).unwrap();
      console.log(res);
      if (res.status === true) {
        alert("Bio updated successfully");
      }
    } catch (error) {
      console.error("Error updating pass score:", error);
      alert(error);
    }
  };
  return (
    <div className="rounded p-7 bg-background">
      <div className="flex items-center gap-10">
        <div className="rounded-full uppercase size-44 text-muted-foreground text-[100px] flex items-center justify-center border-primary/20 border-8">
          {getInitialsFromFullName(userInfo?.fullName)}
        </div>
        <div>
          <p className="font-bold text-2xl">{userInfo?.fullName}</p>
          <p className="text-sm text-[#CACED8]">{userInfo?.role}</p>
        </div>
      </div>

      <div className="flex">
        <div className="border-r w-52 pr-8 flex-none mt-9">
          <Button
            variant="outline"
            className="w-full bg-[#E6EFF5] justify-start"
          >
            Bio data
          </Button>
          <Button
            variant="outline"
            disabled
            className="w-full mt-6 justify-start"
          >
            Edit profile
          </Button>
        </div>
        <div className="font-medium text-sm px-8 mt-9">
          <h3 className="text-2xl text-[#CACED8]">Bio data</h3>
          {userInfo?.bio && (
            <div className="mt-7 font-light border-primary/10 rounded border-[20px] p-3">
              {userInfo?.bio}
            </div>
          )}
          <p className="mt-7">
            Hello {userInfo?.fullName}, so great to have you here! I'm excited
            to get to know you better. Can you tell me a bit more about
            yourself? what are your passions and dreams? What do you love to do
            in your free time? And what are your goals and aspirations for the
            future? I'm all ears!
          </p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea textarea-bordered w-full min-h-[200px] mt-7"
            placeholder="your goals and aspirations"
          ></textarea>
          <Button className="w-full mt-7" onClick={handleUpdate}>
            {userInfo?.bio ? "Update Bio" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
