import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Zod Schema for validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  oldPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val, ctx) => {
      if (val !== ctx.parent.oldPassword) {
        return false;
      }
      return true;
    }, "New password must not be the same as the old password"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  // Default profile data (you can replace this with data from API)
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: 'Pedro Duarte',  // Example data
    email: 'pedro@example.com',  // Example data
    oldPassword: '',
    newPassword: ''
  });

  // Use React Hook Form for profile form handling
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData,  // Set initial form values
  });

  // Handle form submission
  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile Updated", data);
    // Handle the profile update logic here (API call to backend)
    // After success, update the state with new profile data
    setProfileData(data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* Display Profile Data */}
      <div className="mb-6">
        <div>
          <strong>Name:</strong> {profileData.name}
        </div>
        <div>
          <strong>Email:</strong> {profileData.email}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="col-span-3"
                  defaultValue={profileData.name}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  className="col-span-3"
                  defaultValue={profileData.email}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Old Password Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPassword" className="text-right">
                  Old Password
                </Label>
                <Input
                  type="password"
                  id="oldPassword"
                  {...register("oldPassword")}
                  className="col-span-3"
                />
                {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
              </div>

              {/* New Password Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  New Password
                </Label>
                <Input
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                  className="col-span-3"
                />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
