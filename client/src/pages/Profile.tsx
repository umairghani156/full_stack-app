import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
ode
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile Updated", data);
    // Handle the profile update logic here (API call to backend)
  };

  return (
    <div className="container mx-auto p-6">
     

     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default ProfilePage;
