
# Swap file setup
echo "Configuring swap file..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo "Swap file created and enabled."
else
    echo "Swap file already exists."
fi

# Sysctl optimization (optional, but good for small servers)
sysctl vm.swappiness=10
