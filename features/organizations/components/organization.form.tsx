"use client";

import { z } from "zod";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { createOrganizationAction } from "../actions";
import { organizationSchema } from "../types";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListResult } from "pocketbase";
import { CountryModel } from "@/features/countries/country.service";

type OrganizationFormValues = z.infer<typeof organizationSchema>;

type OrganizationFormProps = {
  countries: ListResult<CountryModel>;
};

export function OrganizationForm({ countries }: OrganizationFormProps) {
  const [logoFile, setLogoFile] = useState<any | null>(null);
  const router = useRouter();

  const { execute, result, isPending } = useAction(createOrganizationAction, {
    onSettled(args) {
      if (!args.result.validationErrors) {
        router.replace("/organizations");
        console.log("redirecting to home ", args);
      }
    },
    onError(args) {
      console.log("on error ", args);
    },
  });

  console.log("result ", result);

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationFormValues) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", data.name);
    if (logoFile) {
      formData.append("logo", logoFile);
    }
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("description", data.description);
    formData.append("country", data.country);

    // Call the server action to submit the form
    //await createOrganizationAction(formData);
    let result = await execute(formData);
    console.log("result ", result);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
    }
  };

  const validationErrors = result?.validationErrors;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} name="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Logo</FormLabel>
          <FormControl>
            <Input type="file" onChange={handleFileChange} name="logo" />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" name="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage defaultValue={validationErrors?.country?.[0]} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} name="address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} name="description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isPending ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
