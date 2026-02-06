import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { Trash2, FileText, CirclePlus } from 'lucide-react';
import { createPipSchema } from '@/schemas/create-pip-schema';
import type { FormData } from '@/schemas/create-pip-schema';

export default function PIPForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPipSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      group: '',
      supervisor: '',
      pipType: '',
      expectation: '',
      kpis: [{ description: '' }], // start with one empty KPI
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'kpis',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Here you would send data to your API (including the kpis array)
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => false, // prevent auto upload — handle manually if needed
    onChange(info) {
      if (info.file.status !== 'uploading') {
        message.success(`${info.file.name} file added`);
      }
    },
  };

  return (
    <Card className="mx-auto shadow-lg">
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Employee Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='space-y-2'>
              <Label className='text-sm text-[#000000]' htmlFor="name">Employee Name</Label>
              <Input id="name" {...register('name')} placeholder="Kehinde Adeyemo" />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label className='text-sm text-[#000000]' htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} disabled placeholder="kehinde.adeyemo@sterling.ng" />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label className='text-sm text-[#000000]' htmlFor="role">Job Role</Label>
              <Input id="role" {...register('role')} disabled placeholder="Software Engineer" />
            </div>

            <div className='space-y-2'>
              <Label className='text-sm text-[#000000]' htmlFor="group">Group</Label>
              <Input id="group" {...register('group')} disabled placeholder="Engineering" />
            </div>

            <div className="space-y-2">
  <Label className="text-sm text-[#000000]">Supervisor</Label>
  
  <Select
    onValueChange={(value) => {
      const input = document.getElementById('supervisor') as HTMLInputElement;
      if (input) {
        input.value = value;
        // Optional: trigger validation manually if needed
        // input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select supervisor" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Erhuwvu Oghene">Erhuwvu Oghene</SelectItem>
    </SelectContent>
  </Select>

  <input type="hidden" id="supervisor" {...register('supervisor')} />

  {errors.supervisor && (
    <p className="text-sm text-red-500 mt-1">{errors.supervisor.message}</p>
  )}
</div>

            <div className="space-y-2">
  <Label className="text-sm text-[#000000]">PIP Type</Label>

  <Select
    onValueChange={(value) => {
      // Option 1: DOM manipulation (your current approach)
      const input = document.getElementById('pipType') as HTMLInputElement;
      if (input) input.value = value;
      
      // Option 2 (recommended): Use react-hook-form's setValue (cleaner)
      // setValue('pipType', value, { shouldValidate: true });
    }}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="First Review">First Review</SelectItem>
      <SelectItem value="Second Review">Second Review</SelectItem>
      {/* Add more options as needed */}
    </SelectContent>
  </Select>

  <input type="hidden" id="pipType" {...register('pipType')} />

  {errors.pipType && (
    <p className="text-sm text-red-500 mt-1">{errors.pipType?.message}</p>
  )}
</div>
          </div>

          {/* Performance Expectation */}
          <div className="space-y-2">
            <Label className='text-sm text-[#000000]' htmlFor="expectation">Performance Expectation</Label>
            <Textarea
              id="expectation"
              {...register('expectation')}
              rows={4}
              placeholder="The employee is expected to show measurable improvement..."
            />
            {errors.expectation && (
              <p className="text-sm text-red-500 mt-1">{errors.expectation.message}</p>
            )}
          </div>

          {/* Document Upload */}
          <div className="space-y-2">
            <Label className='text-sm text-[#000000]'>Upload Supporting Document (Optional)</Label>
            <Upload {...uploadProps} className="mt-2">
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <FileText size={16} />
                Upload Document
              </Button>
            </Upload>
          </div>

          {/* KPIs - Dynamic Array */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className='text-sm text-[#000000]'>Enter KPI Description</Label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => append({ description: '' })}
                className="flex items-center gap-1 bg-red-200 text-sm text-[#DB353A]"
              >
                <CirclePlus size={12} />
                Add KPI
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-2 bg-gray-50 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">KPI {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1} // prevent removing the last one
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>

                <Textarea
                  {...register(`kpis.${index}.description`)}
                  rows={3}
                  placeholder="Consistently meeting or exceeding monthly targets..."
                />

                {errors.kpis?.[index]?.description && (
                  <p className="text-sm text-red-500">
                    {errors.kpis[index]?.description?.message}
                  </p>
                )}
              </div>
            ))}

            {errors.kpis && typeof errors.kpis === 'string' && (
              <p className="text-sm text-red-500">{errors.kpis}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-8">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}