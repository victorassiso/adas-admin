// import { Label } from "@/components/ui/label"

// export function Form() {
//   return (
//     <form
//       onSubmit={handleSubmit(handleCreateNewAnimal)}
//       className="flex flex-col gap-6 overflow-y-scroll px-6 md:max-h-[calc(80%-1.5rem)]"
//     >

//       <div className="flex flex-col gap-2">
//         <div className="flex items-center justify-center">
//           <img src={imagePreview || noImageIcon} alt="Foto de perfil" />
//         </div>
//         <div className="flex items-center gap-2">
//           <Label
//             htmlFor="picture"
//             id="picture"
//             className={isSubmitting ? 'cursor-wait' : ''}
//           >
//             Foto do animal
//           </Label>
//           {errors.avatar && (
//             <span className="text-xs text-destructive">
//               {errors.avatar.message}
//             </span>
//           )}
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           disabled={isSubmitting}
//           className="disabled:cursor-wait"
//           {...register('avatar')}
//         />
//       </div>
//       {newAnimalInputs.map((item) => {
//         if (item.id === 'sex') {
//           return (
//             <Controller
//               key={item.id}
//               control={control}
//               name={item.id}
//               render={({ field: { onChange } }) => (
//                 <div className="flex flex-col gap-2">
//                   <div className="flex items-center gap-2">
//                     <Label
//                       id={item.id}
//                       className={isSubmitting ? 'cursor-wait' : ''}
//                     >
//                       {item.label}
//                     </Label>
//                     <span className="text-xs text-destructive">
//                       {errors[item.id as keyof NewAnimalForm]?.message}
//                     </span>
//                   </div>
//                   <RadioGroup onValueChange={onChange} className="flex gap-4">
//                     <div className="flex items-center gap-2">
//                       <RadioGroupItem value="Macho" id="Macho" />
//                       <Label htmlFor="Macho">Macho</Label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <RadioGroupItem value="Fêmea" id="Fêmea" />
//                       <Label htmlFor="Fêmea">Fêmea</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               )}
//             />
//           )
//         }
//         if (item.id === 'size') {
//           return (
//             <Controller
//               key={item.id}
//               control={control}
//               name={item.id}
//               render={({ field: { onChange } }) => (
//                 <div key={item.id} className="flex flex-col gap-2">
//                   <div className="flex items-center gap-2">
//                     <Label
//                       className={isSubmitting ? 'cursor-wait' : ''}
//                       htmlFor={item.id}
//                     >
//                       {item.label}
//                     </Label>
//                     <span className="text-xs text-destructive">
//                       {errors[item.id as keyof NewAnimalForm]?.message}
//                     </span>
//                   </div>
//                   <RadioGroup onValueChange={onChange} className="flex gap-4">
//                     <div className="flex items-center gap-2">
//                       <RadioGroupItem value="Grande" id="Grande" />
//                       <Label htmlFor="Grande">Grande</Label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <RadioGroupItem value="Médio" id="Médio" />
//                       <Label htmlFor="Médio">Médio</Label>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <RadioGroupItem value="Pequeno" id="Pequeno" />
//                       <Label htmlFor="Pequeno">Pequeno</Label>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               )}
//             />
//           )
//         }

//         return (
//           <div key={item.id} className="flex flex-col gap-2">
//             <div className="flex items-center gap-2">
//               <Label
//                 htmlFor={item.id}
//                 className={isSubmitting ? 'cursor-wait' : ''}
//               >
//                 {item.label}
//               </Label>
//               {errors[item.id as keyof NewAnimalForm] && (
//                 <span className="text-xs text-destructive">
//                   {errors[item.id as keyof NewAnimalForm]?.message}
//                 </span>
//               )}
//             </div>
//             <Input
//               id={item.id}
//               type={item.type}
//               {...register(item.id as keyof NewAnimalForm)}
//               disabled={isSubmitting}
//               className="disabled:cursor-wait"
//             />
//           </div>
//         )
//       })}
//       <DialogFooter>
//         <DialogClose asChild>
//           <Button
//             variant="ghost"
//             disabled={isSubmitting}
//             className="disabled:cursor-wait"
//           >
//             Cancelar
//           </Button>
//         </DialogClose>
//         <Button disabled={isSubmitting} className="disabled:cursor-wait">
//           Cadastrar animal
//         </Button>
//       </DialogFooter>
//     </form>
//   )
// }
