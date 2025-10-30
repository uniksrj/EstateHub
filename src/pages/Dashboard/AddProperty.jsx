"use client"

import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { propertiesAPI } from "../../services/api"
import { Checkbox } from "@/components/ui/checkbox"
import { toast, Toaster } from "sonner"

const AddProperty = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams()
  const isEdit = location.pathname.includes('/edit');
  console.log(isEdit);

  const formRef = useRef();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState([])
  const [amenities, setAmenities] = useState({
    has_pool: false,
    has_garden: false,
    has_garage: false,
    has_parking: false,
    has_security: false,
    has_air_conditioning: false,
    has_heating: false,
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages([...images, ...newImages])
  }

  const removeImage = (index) => {
    const newImages = [...images]
    URL.revokeObjectURL(newImages[index].preview)
    newImages.splice(index, 1)
    setImages(newImages)
  }
  // Store form data 
  useEffect(() => {
    if (isEdit && formRef.current) {
      // Fetch property data and populate form
      (async () => {
        try {
          const response = await propertiesAPI.getById(id);
          const property = response.data;
          setAmenities({
            has_pool: property.has_pool === true,
            has_garden: property.has_garden === true,
            has_garage: property.has_garage === true,
            has_parking: property.has_parking === true,
            has_security: property.has_security === true,
            has_air_conditioning: property.has_air_conditioning === true,
            has_heating: property.has_heating === true,
          });
          for (const [key, value] of Object.entries(property)) {
            // Skip amenities since we're handling them in state
            if (key.startsWith('has_')) continue;

            const input = formRef.current.querySelector(`[name="${key}"]`);
            if (!input) continue;

            if (input.type === 'checkbox') {
              input.checked = Boolean(value);
            } else {
              input.value = value ?? "";
            }
            if (input.tagName === 'SELECT') {
              const event = new Event('change', { bubbles: true });
              input.dispatchEvent(event);
            }
          }
        } catch (error) {
          console.error("Failed to load property data:", error);
          toast.error("Failed to load property data. Please try again.");
        }
      })();
    }

  }, [isEdit, id]);

  const handleAmenityChange = (name, checked) => {
    setAmenities(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    var btnTxt;
    if (!isEdit) {
      btnTxt = "Adding";
    } else {
      btnTxt = "Updating";
    }
    try {
      const formData = new FormData(formRef.current);

      const data = Object.fromEntries(formData.entries());
      // console.log(data);

      if (!data.title?.trim() || !data.description?.trim() || !data.price?.trim() ||
        !data.address?.trim() || !data.property_type?.trim() || !data.bedrooms?.trim() ||
        !data.bathrooms?.trim() || !data.sq_ft?.trim() || !data.city?.trim() ||
        !data.state?.trim() || !data.country?.trim() || !data.zip_code?.trim()
      ) {
        setError("Please fill in all required fields.")
        toast.error("Validation Error", {
          description: "Please fill in all required fields.",
        })
        setLoading(false)
        return;
      }

      const price = parseFloat(data.price);
      const beds = parseInt(data.bedrooms);
      const baths = parseFloat(data.bathrooms);
      const sqft = parseInt(data.sq_ft);
      const yearBuilt = data.year_built ? parseInt(data.year_built) : null;
      const garage = data.garage ? parseInt(data.garage) : null;

      if (isNaN(price) || isNaN(beds) || isNaN(baths) || isNaN(sqft) ||
        (yearBuilt && isNaN(yearBuilt)) || (garage && isNaN(garage))) {
        setError("Please enter valid numeric values for Price, Bedrooms, Bathrooms, Square Feet, Year Built, and Garage.")
        toast.error("Validation Error", {
          description: "Please enter valid numeric values for Price, Bedrooms, Bathrooms, Square Feet, Year Built, and Garage.",
        })
        setLoading(false)
        return;
      }

      if (yearBuilt && (yearBuilt < 1800 || yearBuilt > new Date().getFullYear())) {
        setError(`Year Built must be between 1800 and ${new Date().getFullYear()}.`)
        toast.error("Validation Error", {
          description: `Year Built must be between 1800 and ${new Date().getFullYear()}.`,
        })
        setLoading(false)
        return;
      }

      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image.file)
      })

      const checkboxes = ['has_pool', 'has_garden', 'has_garage', 'has_parking', 'has_security', 'has_air_conditioning', 'has_heating'];

      checkboxes.forEach(checkboxName => {
        // If checkbox is not in formData, add it as false
        if (!formData.has(checkboxName)) {
          formData.append(checkboxName, '0');
        } else {
          formData.set(checkboxName, '1');
        }
      });
      const toastId = toast.loading(`${btnTxt} property...`);
      if (!isEdit) {
        await propertiesAPI.create(formData)
      } else {
        await propertiesAPI.update(id, formData)
      }
      toast.dismiss(toastId);
      toast.success("Success!", {
        description: `Property ${btnTxt} successfully!`,
      });
      navigate("/dashboard", {
        state: { message: "Property added successfully!" },
      })
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error_type || `Failed to ${btnTxt} property. Please try again.`);
      toast.error("Error", {
        description: `(${err.data?.error_type}) Failed to ${btnTxt} property. Please try again.`,
      });

    } finally {
      setLoading(false)
    }
  }

  console.log(loading);


  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Toaster position="top-right" />
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            {
              isEdit ? (
                <h1 className="text-3xl font-bold">Edit Property</h1>
              ) : (
                <h1 className="text-3xl font-bold">Add New Property</h1>
              )
            }
            <p className="text-muted-foreground">Fill in the details below to {isEdit ? "update" : "add"} your property.</p>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Toaster position="top-right" />
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Modern Downtown Loft"
                    // value={formData.title}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="e.g., 850000"
                    // value={formData.price}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Location *</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g., Downtown District, City Name"
                  // value={formData.location}
                  // onChange={handleChange}
                  // required
                  disabled={loading}
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g., New york"
                    // value={formData.title}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="e.g., "
                    // value={formData.price}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="e.g., USA"
                    // value={formData.price}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip_code">Zip Code *</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    placeholder="e.g., 122547"
                    // value={formData.price}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your property in detail..."
                  // value={formData.description}
                  // onChange={handleChange}
                  // required
                  disabled={loading}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Specify the property characteristics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select
                    name="property_type"
                    id="property_type"
                    // required
                    // value={formData.type}
                    // onValueChange={(value) => handleSelectChange("type", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="e.g., 2"
                    // value={formData.beds}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 2"
                    // value={formData.baths}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sq_ft">Square Feet *</Label>
                  <Input
                    id="sq_ft"
                    name="sq_ft"
                    type="number"
                    placeholder="e.g., 1200"
                    // value={formData.sqft}
                    // onChange={handleChange}
                    // required
                    disabled={loading}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year_built">Year Built</Label>
                <Input
                  id="year_built"
                  name="year_built"
                  type="number"
                  placeholder="e.g., 2020"
                  // value={formData.yearBuilt}
                  // onChange={handleChange}
                  disabled={loading}
                // min="1800"
                // max={new Date().getFullYear()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="garage">Garage Spaces</Label>
                <Input
                  id="garage"
                  name="garage"
                  type="number"
                  placeholder="e.g., 2"
                  // value={formData.garage}
                  // onChange={handleChange}
                  disabled={loading}
                  min="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features & Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
              <CardDescription>List the key features and amenities (comma-separated)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="e.g, Hardwood floors, Granite countertops, Walk-in closet"
                  // value={formData.features}
                  // onChange={handleChange}
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_pool"
                      name="has_pool"
                      checked={amenities.has_pool}
                      onCheckedChange={(checked) => handleAmenityChange("has_pool", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_pool" className="cursor-pointer">Swimming Pool</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_garden"
                      name="has_garden"
                      checked={amenities.has_garden}
                      onCheckedChange={(checked) => handleAmenityChange("has_garden", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_garden" className="cursor-pointer">Garden</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_garage"
                      name="has_garage"
                      checked={amenities.has_garage}
                      onCheckedChange={(checked) => handleAmenityChange("has_garage", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_garage" className="cursor-pointer">Garage</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_parking"
                      name="has_parking"
                      checked={amenities.has_parking}
                      onCheckedChange={(checked) => handleAmenityChange("has_parking", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_parking" className="cursor-pointer">Parking</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_security"
                      name="has_security"
                      checked={amenities.has_security}
                      onCheckedChange={(checked) => handleAmenityChange("has_security", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_security" className="cursor-pointer">Security System</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_air_conditioning"
                      name="has_air_conditioning"
                      checked={amenities.has_air_conditioning}
                      onCheckedChange={(checked) => handleAmenityChange("has_air_conditioning", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_air_conditioning" className="cursor-pointer">Air Conditioning</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_heating"
                      name="has_heating"
                      checked={amenities.has_heating}
                      onCheckedChange={(checked) => handleAmenityChange("has_heating", checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="has_heating" className="cursor-pointer">Heating System</Label>
                  </div>
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="amenities">Amenities</Label>
                <Textarea
                  id="amenities"
                  name="amenities"
                  placeholder="e.g., Swimming pool, Gym, Parking, Pet-friendly"
                  // value={formData.amenities}
                  // onChange={handleChange}
                  disabled={loading}
                  rows={3}
                />
              </div> */}
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <CardDescription>Upload high-quality images of your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="images" className="cursor-pointer">
                    <span className="text-accent hover:underline">Click to upload images</span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? "Updating Property..." : "Adding Property..."}
                </>
              ) : (
                isEdit ? "Update Property" : "Add Property"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProperty
