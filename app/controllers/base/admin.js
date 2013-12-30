import BaseActionsMixin  from "appkit/mixins/controllers/base_actions";
import FileUploadMixin   from "appkit/mixins/controllers/fileupload";
import AttributesMixin   from "appkit/mixins/controllers/attributes";
import PaginationMixin   from "appkit/mixins/controllers/pagination";
import BatchActionsMixin from "appkit/mixins/controllers/base_actions";
import FormActionsMixin from "appkit/mixins/controllers/form_actions";

export default  Ember.ObjectController.extend(BaseActionsMixin,
  FileUploadMixin,
  AttributesMixin,
  PaginationMixin,
  BatchActionsMixin,
  FormActionsMixin
);