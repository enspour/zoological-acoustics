import { InjectionToken } from '@angular/core';

import { KuduMenu } from '../interfaces';

export const kuduMenu = new InjectionToken<KuduMenu>('kudu-ui/menu');
