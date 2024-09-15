#!/bin/bash

# Define an array of breakpoints (widths)
sizes=(320 375 414 768 1024 1280 1440 1920 2560)

declare -A images
images=( ["axilum.webp"]="1600x1067"
         ["engie.webp"]="1080x600"
         ["gunnebo.webp"]="1497x1059"
         ["obs.webp"]="1280x800"
         ["portfolio.webp"]="1330x1151"
         ["salaires.dev.webp"]="1024x1024"
       )

# Loop through each image
for image in "${!images[@]}"; do
    original_size=${images[$image]}
    width=${original_size%x*}  
    height=${original_size#*x} 
    
    echo "Processing $image with original size $width x $height"

    # Loop through each size and resize
    for size in "${sizes[@]}"; do
        new_height=$(( size * height / width ))

        convert "$image" -resize "${size}x${new_height}" "${image%.*}-${size}w.webp"
        echo "Created ${image%.*}-${size}w.webp with size ${size}x${new_height}"
    done
done

