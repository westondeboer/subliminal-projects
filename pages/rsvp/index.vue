<template>
  <div class="rsvp-container">
    <div class="rsvp-card">
      <h1 class="rsvp-title">{{ (page && page.title) ? page.title : 'RSVP' }}</h1>
      <div v-if="page && page.content" class="rsvp-subtitle" v-html="page.content"></div>
      <p v-else class="rsvp-subtitle">Please join us. Let us know if you can make it.</p>

      <transition name="fade" mode="out-in">
        <!-- Form State -->
        <form
          v-if="!submitted"
          key="form"
          @submit.prevent="submitForm"
          class="rsvp-form"
        >
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Jane Doe"
              required
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="jane@example.com"
              required
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="partySize">Party Size</label>
            <div class="select-wrapper">
              <select id="partySize" v-model="form.partySize" :disabled="loading">
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading">Sending...</span>
            <span v-else>Confirm RSVP</span>
          </button>
        </form>

        <!-- Success State -->
        <div v-else key="success" class="success-message">
          <div class="success-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your RSVP has been received.</p>
          <button @click="resetForm" class="reset-btn">Submit Another</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request";

export default {
  async asyncData({ $graphql }) {
    try {
      const query = gql`
        query RSVPPage {
          page(id: "rsvp", idType: URI) {
            title
            content
          }
        }
      `;
      const { page } = await $graphql.default.request(query);
      return { page };
    } catch (e) {
      console.error("Failed to fetch RSVP content", e);
      return { page: null };
    }
  },
  data() {
    return {
      // page is now provided by asyncData
      loading: false,
      submitted: false,
      error: null,
      form: {
        name: "",
        email: "",
        partySize: 1
      }
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = null;

      const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        this.error = "Configuration Error: server URL is missing.";
        this.loading = false;
        return;
      }

      try {
        // Prepare form data for Google Apps Script
        // we use URLSearchParams (application/x-www-form-urlencoded)
        // We include BOTH the internal variable names and the Sheet Header names
        // to ensure the script finds the data regardless of which it expects.
        const formData = new URLSearchParams();

        // Common timestamp
        formData.append("timestamp", new Date().toISOString());
        formData.append("Timestamp", new Date().toISOString());

        // Name
        formData.append("name", this.form.name);
        formData.append("Full Name", this.form.name);

        // Email
        formData.append("email", this.form.email);
        formData.append("Email Address", this.form.email);

        // Party Size
        formData.append("partySize", this.form.partySize);
        formData.append("Total Guests (including you)", this.form.partySize);

        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        });

        // Since 'no-cors' returns an opaque response, we assume success if no network error thrown.
        this.submitted = true;
      } catch (err) {
        console.error("RSVP Error:", err);
        this.error = "Something went wrong. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.submitted = false;
      this.form = {
        name: "",
        email: "",
        partySize: 1
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.rsvp-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9; // Fallback
}

.rsvp-card {
  background: white;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  text-align: center;
  transition: height 0.3s ease;
}

.rsvp-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.rsvp-subtitle {
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  input,
  select {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
    -webkit-appearance: none; // Remove default styling on iOS
    background: white;

    &:focus {
      border-color: #000;
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
}

.select-wrapper {
  position: relative;

  // Custom arrow
  &::after {
    content: "▼";
    font-size: 0.8rem;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
  }
}

.submit-btn {
  width: 100%;
  padding: 1.2rem;
  background: #000;
  color: white;
  border: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.3s, transform 0.1s;
  margin-top: 1rem;

  &:hover {
    background: #333;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #999;
    cursor: wait;
  }
}

.error-message {
  color: #d93025;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.success-message {
  padding: 2rem 0;

  .success-icon {
    font-size: 4rem;
    color: #0f9d58;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .reset-btn {
    background: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 2rem;
    color: #666;

    &:hover {
      color: #000;
    }
  }
}

// Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
