import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getProfile, updateProfile } from '@/redux/thunks/auth.thunk';
import { useAppDispatch, useAppSelector } from '@/hooks';

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.oldPassword && data.newPassword && data.oldPassword === data.newPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "New password must not be the same as the old password",
      path: ["newPassword"],
    });
  }
});


type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.user) {
      reset({
        name: profile.user.name || '',
        email: profile.user.email || '',
        oldPassword: '',
        newPassword: '',
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    const newData = {
      name: data.name,
      email: data.email,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword,
      id: profile?.user.id
    };
    console.log("Profile Updated", newData);
    dispatch(updateProfile(newData)); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="mb-6">
        <div><strong>Name:</strong> {profile?.user.name}</div>
        <div><strong>Email:</strong> {profile?.user.email}</div>
      </div>

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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" {...register("name")} className="col-span-3" />
                {errors.name && <p className="text-red-500 col-span-4">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" {...register("email")} className="col-span-3" />
                {errors.email && <p className="text-red-500 col-span-4">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPassword" className="text-left">Old Password</Label>
                <Input type="password" id="oldPassword" {...register("oldPassword")} className="col-span-3" />
                {errors.oldPassword && <p className="text-red-500 col-span-4">{errors.oldPassword.message}</p>}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-left">New Password</Label>
                <Input type="password" id="newPassword" {...register("newPassword")} className="col-span-3" />
                {errors.newPassword && <p className="text-red-500 col-span-4">{errors.newPassword.message}</p>}
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
