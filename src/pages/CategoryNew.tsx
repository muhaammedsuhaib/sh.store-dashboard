import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  X,
  Image as ImageIcon,
  Link,
  Folder,
  Plus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";
import QuickTip from "../components/common/QuickTip";
import { toast } from "react-hot-toast";
import { useCreateCategory } from "../api/category";
import { useCategories } from "../api/category/get_categories";

// Types
interface CategoryFormData {
  name: string;
  description: string;
  images: string[];
  urlInput?: string;
  parent: string | null;
  is_active: boolean;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  images: string[];
  parent: string | null;
  shop: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateCategoryPayload {
  name: string;
  description: string;
  images: string[];
  parent: string | null;
  is_active: boolean;
}

interface UrlValidationResult {
  validUrls: string[];
  invalidUrls: string[];
  duplicates: string[];
}

// Utility functions
const validateImageUrls = (
  urls: string[],
  existingUrls: string[] = []
): UrlValidationResult => {
  const validUrls: string[] = [];
  const invalidUrls: string[] = [];
  const duplicates: string[] = [];

  urls.forEach((url) => {
    const trimmedUrl = url.trim();

    // Skip empty strings
    if (!trimmedUrl) return;

    // Check for duplicates
    if (existingUrls.includes(trimmedUrl) || validUrls.includes(trimmedUrl)) {
      duplicates.push(trimmedUrl);
      return;
    }

    try {
      const urlObj = new URL(trimmedUrl);

      // Validate protocol
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        invalidUrls.push(trimmedUrl);
        return;
      }

      // Check for common image file extensions
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
        ".bmp",
        ".tiff",
      ];
      const pathname = urlObj.pathname.toLowerCase();
      const hasImageExtension = imageExtensions.some((ext) =>
        pathname.endsWith(ext)
      );

      // Check for common image hosting domains or paths
      const isLikelyImage =
        hasImageExtension ||
        urlObj.hostname.includes("cloudinary") ||
        urlObj.hostname.includes("imgur") ||
        urlObj.hostname.includes("unsplash") ||
        urlObj.hostname.includes("picsum") ||
        urlObj.hostname.includes("images.unsplash") ||
        urlObj.hostname.includes("res.cloudinary") ||
        urlObj.pathname.includes("/image/") ||
        urlObj.pathname.includes("/images/") ||
        urlObj.pathname.includes("/img/") ||
        urlObj.pathname.includes("/media/");

      if (isLikelyImage) {
        validUrls.push(trimmedUrl);
      } else {
        invalidUrls.push(trimmedUrl);
      }
    } catch {
      invalidUrls.push(trimmedUrl);
    }
  });

  return { validUrls, invalidUrls, duplicates };
};

export default function CategoryNew() {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [urlValidation, setUrlValidation] = useState<{
    isValidating: boolean;
    result: UrlValidationResult | null;
  }>({
    isValidating: false,
    result: null,
  });
  const {
    data: parentCategories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories();

  const { mutate: categoryMutate, isPending: categoryLoading } =
    useCreateCategory();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError,
    watch,
    setValue,
    clearErrors,
    trigger,
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      images: [],
      parent: null,
      is_active: true,
    },
    mode: "onChange",
  });

  const watchedDescription = watch("description");
  const watchedImages = watch("images");
  const watchedName = watch("name");

  // Validate URLs in real-time
  const validateUrlsInRealTime = async (urls: string) => {
    if (!urls.trim()) {
      setUrlValidation({ isValidating: false, result: null });
      return;
    }

    setUrlValidation({ isValidating: true, result: null });

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const urlArray = urls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const result = validateImageUrls(urlArray, watchedImages || []);
    setUrlValidation({ isValidating: false, result });
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setError("images", { message: "Please select only image files" });
    } else {
      clearErrors("images");
      setUploadedImages((prev) => [...prev, ...imageFiles]);

      toast.success(`Added ${imageFiles.length} image file(s)`, {
        duration: 3000,
      });
    }
    // Reset file input
    event.target.value = "";
  };

  // Remove uploaded image
  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Image removed");
  };

  // Remove URL image
  const removeUrlImage = (index: number) => {
    const currentImages = watchedImages || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages, { shouldValidate: true });
    toast.success("Image URL removed");
  };

  // Add URL images to form with comprehensive validation
  const addUrlImages = () => {
    if (!imageUrls.trim()) {
      setError("urlInput", { message: "Please enter at least one URL" });
      return;
    }

    const urlArray = imageUrls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urlArray.length === 0) {
      setError("urlInput", { message: "Please enter valid URLs" });
      return;
    }

    const result = validateImageUrls(urlArray, watchedImages || []);

    // Handle validation results
    if (result.validUrls.length === 0) {
      if (result.invalidUrls.length > 0) {
        setError("urlInput", {
          message:
            "All URLs are invalid. Please check the format and try again.",
        });
      } else if (result.duplicates.length > 0) {
        setError("urlInput", {
          message: "All URLs are already added to the category",
        });
      }
      return;
    }

    // Add valid URLs to form
    const currentImages = watchedImages || [];
    setValue("images", [...currentImages, ...result.validUrls], {
      shouldValidate: true,
    });

    // Show appropriate messages
    let message = `Added ${result.validUrls.length} image URL(s)`;
    const warnings = [];

    if (result.duplicates.length > 0) {
      warnings.push(`${result.duplicates.length} duplicate(s) ignored`);
    }
    if (result.invalidUrls.length > 0) {
      warnings.push(`${result.invalidUrls.length} invalid URL(s) ignored`);
    }

    if (warnings.length > 0) {
      message += ` (${warnings.join(", ")})`;
    }

    toast.success(message, {
      duration: 4000,
    });

    // Reset state
    setImageUrls("");
    setUrlValidation({ isValidating: false, result: null });
    clearErrors("urlInput");
  };

  // Handle form submission with FormData
  const onSubmit = async (data: CategoryFormData) => {
    try {
      // Create FormData object
      const formData = new FormData();

      // Append basic form fields
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("is_active", data.is_active.toString());

      if (data.parent) {
        formData.append("parent", data.parent);
      }

      // Append uploaded image files
      uploadedImages.forEach((file) => {
        formData.append("images", file);
      });

      // Append URL images as JSON string
      if (data.images && data.images.length > 0) {
        formData.append("urls", JSON.stringify(data.images));
      }

      // Log FormData contents for debugging (remove in production)
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (key === "images") {
          console.log(`${key}:`, (value as File).name, (value as File).type);
        } else if (key === "urls") {
          console.log(`${key}:`, value);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Create category with FormData
      categoryMutate(formData, {
        onSuccess: (response: any) => {
          toast.success("Category created successfully! 🎉");
          // Redirect to categories list after success
          refetchCategories();
          setTimeout(() => {
            navigate("/categories");
          }, 1500);
        },
        onError: (err: any) => {
          const errorMessage =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong. Please try again.";

          setError("root", { message: errorMessage });

          toast.error(errorMessage, {
            duration: 4000,
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#7f1d1d",
              color: "#fff",
              fontWeight: 500,
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          });
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process form data";
      setError("root", { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  const allImages = [
    ...(watchedImages || []),
    ...uploadedImages.map((file) => URL.createObjectURL(file)),
  ];

  const isFormValid = isValid && watchedName?.trim().length >= 2;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <SubHeader
          title="Create New Category"
          description="Add a new product category to organize your inventory"
          icon={Folder}
          iconBackground="blue"
          badge={{ variant: "blue", dot: true, text: "New Category" }}
        />

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            {/* Basic Information Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Folder className="h-5 w-5 text-blue-600" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Name */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Category name is required",
                      minLength: {
                        value: 3,
                        message: "Category name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "Category name must be less than 100 characters",
                      },
                      validate: {
                        noEmpty: (value) => {
                          const trimmed = value.trim();
                          if (trimmed.length === 0)
                            return "Category name is required";
                          if (trimmed.length < 3)
                            return "Category name must be at least 3 characters";
                          return true;
                        },
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder="e.g., Electronics, Clothing, Home & Kitchen"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Parent Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Parent Category
                  </label>
                  <select
                    {...register("parent")}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    disabled={isLoadingCategories}
                  >
                    <option value="">No Parent (Main Category)</option>
                    {Array.isArray(parentCategories?.data) &&
                      parentCategories?.data?.map((category: any) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  {isLoadingCategories && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Loading categories...
                    </p>
                  )}
                  {categoriesError && (
                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Failed to load parent categories
                    </p>
                  )}
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Leave empty to create a main category
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Status
                  </label>
                  <div className="flex items-center gap-4 p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="true"
                        {...register("is_active")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">
                        Active
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="false"
                        {...register("is_active")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      maxLength: {
                        value: 500,
                        message: "Description must be less than 500 characters",
                      },
                    })}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.description
                        ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder="Describe this category and what products it contains..."
                  />
                  <div className="flex justify-between mt-2">
                    {errors.description ? (
                      <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.description.message}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Optional but recommended for better organization
                      </p>
                    )}
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        (watchedDescription?.length || 0) > 450
                          ? "text-amber-600"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {(watchedDescription?.length || 0) > 450 && (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {watchedDescription?.length || 0}/500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                Category Images
                {allImages.length > 0 && (
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                    ({allImages.length} image{allImages.length !== 1 ? "s" : ""}
                    )
                  </span>
                )}
              </h2>

              {/* Image URL Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Add Image URLs
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={imageUrls}
                      onChange={async (e) => {
                        setImageUrls(e.target.value);
                        await validateUrlsInRealTime(e.target.value);
                        if (errors.urlInput) {
                          clearErrors("urlInput");
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addUrlImages();
                        }
                      }}
                      className={`w-full px-4 py-3 pr-10 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.urlInput
                          ? "border-red-300 dark:border-red-700 focus:ring-red-500"
                          : "border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-transparent"
                      }`}
                      placeholder="Enter image URLs separated by commas"
                    />

                    {/* Validation Indicator */}
                    {urlValidation.isValidating && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    {urlValidation.result && !urlValidation.isValidating && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {urlValidation.result.validUrls.length > 0 ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={addUrlImages}
                    variant="secondary"
                    icon={Link}
                    className="whitespace-nowrap"
                    disabled={!imageUrls.trim() || urlValidation.isValidating}
                  >
                    Add URLs
                  </Button>
                </div>

                {/* Validation Messages */}
                {errors.urlInput ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.urlInput.message}
                  </p>
                ) : urlValidation.result && !urlValidation.isValidating ? (
                  <div className="mt-2 space-y-1">
                    {urlValidation.result.validUrls.length > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {urlValidation.result.validUrls.length} valid URL(s)
                        ready to add
                      </p>
                    )}
                    {urlValidation.result.invalidUrls.length > 0 && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {urlValidation.result.invalidUrls.length} invalid URL(s)
                        detected
                      </p>
                    )}
                    {urlValidation.result.duplicates.length > 0 && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {urlValidation.result.duplicates.length} duplicate
                        URL(s) found
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Enter full image URLs (https://...) separated by commas
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Upload Images
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 sm:p-8 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        PNG, JPG, GIF, WEBP up to 10MB each
                      </p>
                    </div>
                  </label>
                </div>
                {errors.images && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.images.message}
                  </p>
                )}
              </div>

              {/* Image Previews */}
              {allImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Image Previews ({allImages.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {allImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                          <img
                            src={image}
                            alt={`Category preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Handle broken images
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='10' fill='%2394a3b8'%3EImage%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (index < (watchedImages?.length || 0)) {
                              removeUrlImage(index);
                            } else {
                              removeUploadedImage(
                                index - (watchedImages?.length || 0)
                              );
                            }
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                          title="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {index < (watchedImages?.length || 0)
                            ? "URL"
                            : "Uploaded"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                type="button"
                onClick={() => navigate("/categories")}
                variant="secondary"
                className="flex-1"
                disabled={isSubmitting || categoryLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={Plus}
                className="flex-1"
                disabled={!isFormValid || isSubmitting || categoryLoading}
                loading={isSubmitting || categoryLoading}
              >
                Create Category
              </Button>
            </div>

            {errors.root && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.root.message}
              </p>
            )}
          </form>
        </div>

        <QuickTip
          title="Category Tips"
          tips={[
            "Use clear, descriptive names that customers will understand",
            "Create a logical hierarchy with parent and child categories",
            "Add high-quality images that represent the category well",
            "Use descriptions to help with SEO and customer navigation",
            "Validate image URLs before adding them to ensure they work properly",
          ]}
        />
      </div>
    </div>
  );
}
