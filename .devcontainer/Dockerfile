# Varients include: debian, slim, alpine, distroless, canary, and a mix there-in
ARG VARIANT=latest
FROM oven/bun:${VARIANT}

# Update package registry and install necessary packages
RUN apt update \
    && apt install -y --no-install-recommends \
    # Install openssh-client for SSH connections
    openssh-client \
    # Include ca-certificates for SSL/TLS connections
    ca-certificates \
    # Install git
    git \
    # Clean up apt cache and remove unused packages
    && apt auto-remove -y \
    && apt clean -y \
    # Changes default shell to bash for the bun user
    && chsh -s $(which bash) bun 

# Prefer to run as non-root user
USER bun

# Set working directory to the home directory of the bun user
WORKDIR /home/bun/workspace

# Default command to keep the container running
CMD ["sleep", "infinity"]