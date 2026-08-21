"use client";

import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";

export function EditForm({ destination }) {
  const {
    _id,
    destinationName,
    imageUrl,
    description,
    duration,
    country,
    category,
    departureDate,
    price,
    rating,
  } = destination ;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destinationData = Object.fromEntries(formData.entries());

    console.log("Updated Destination:", destinationData);

    
    const res = await fetch(
      `http://localhost:5000/destinations/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationData),
      }
    );
    const data = await res.json();
    console.log("Response from server:", data);
   
  };
  return (
    <Modal>
      {/* Edit Button */}
      <Button variant="secondary">
        <BiEdit className="size-5" />
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full max-w-4xl">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-4 sm:p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-8">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Update Destination
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                      Update the destination information below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Destination Name */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.destinationName}
                        name="destinationName"
                        isRequired
                      >
                        <Label>Destination Name</Label>
                        <Input
                          name="destinationName"
                          placeholder="Bali Paradise"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField
                      defaultValue={destination.country}
                      name="country"
                      isRequired
                    >
                      <Label>Country</Label>

                      <Input
                        name="country"
                        placeholder="Indonesia"
                        className="rounded-2xl"
                        defaultValue={destination.country}
                      />
                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <Select
                      defaultValue={destination.category}
                      name="category"
                      isRequired
                      className="w-full"
                    >
                      <Label>Category</Label>

                      <Select.Trigger className="rounded-2xl">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="Beach" textValue="Beach">
                            Beach
                            <ListBox.ItemIndicator />
                          </ListBox.Item>

                          <ListBox.Item id="Mountain" textValue="Mountain">
                            Mountain
                            <ListBox.ItemIndicator />
                          </ListBox.Item>

                          <ListBox.Item id="City" textValue="City">
                            City
                            <ListBox.ItemIndicator />
                          </ListBox.Item>

                          <ListBox.Item id="Adventure" textValue="Adventure">
                            Adventure
                            <ListBox.ItemIndicator />
                          </ListBox.Item>

                          <ListBox.Item id="Cultural" textValue="Cultural">
                            Cultural
                            <ListBox.ItemIndicator />
                          </ListBox.Item>

                          <ListBox.Item id="Luxury" textValue="Luxury">
                            Luxury
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* Price */}
                    <TextField
                      defaultValue={destination.price}
                      name="price"
                      type="number"
                      isRequired
                    >
                      <Label>Price (USD)</Label>

                      <Input
                       name="price"
                        type="number"
                        placeholder="1299"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      defaultValue={destination.duration}
                      name="duration"
                      isRequired
                    >
                      <Label>Duration</Label>

                      <Input
                        name="duration"
                        placeholder="7 Days / 6 Nights"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <TextField
                      defaultValue={destination.departureDate}
                      name="departureDate"
                      type="date"
                      isRequired
                    >
                      <Label>Departure Date</Label>

                      <Input name="departureDate" type="date" className="rounded-2xl" />

                      <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label>Image URL</Label>

                        <Input
                          name="imageUrl"
                          type="url"
                          placeholder="https://example.com/bali-paradise.jpg"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={destination.description}
                        name="description"
                        isRequired
                      >
                        <Label>Description</Label>

                        <TextArea
                          name="description"
                          placeholder="Describe the travel experience..."
                          className="rounded-3xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    slot="close"
                    className="w-full rounded-full bg-cyan-500 px-5 py-4 font-bold text-white transition-colors duration-300 hover:bg-cyan-600"
                  >
                    Update Destination
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
  
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
