import { Injectable, Provider } from '@opensumi/di';
import { BaseApplyService } from '@opensumi/ide-ai-native/lib/browser/mcp/base-apply.service';
import { BrowserModule } from '@opensumi/ide-core-browser';
import { AbstractNodeExtProcessService } from '@opensumi/ide-extension/lib/common/extension.service';

import { AINativeContribution } from './ai-native/ai-native.contribution';
import { ApplyService } from './ai-native/apply.service';
import { DebugConfigurationContribution } from './debug-configuration.contribution';
import { EditorEmptyComponentContribution } from './editor-empty-component.contribution';
import { MenuBarContribution } from './menu-bar/menu-bar.contribution';
import { OverrideExtensionNodeService } from './overrides/extension/extension-node.service';
import { StatusBarContribution } from './status-bar.contribution';

@Injectable()
export class SampleModule extends BrowserModule {
  providers: Provider[] = [
    MenuBarContribution,
    EditorEmptyComponentContribution,
    StatusBarContribution,
    AINativeContribution,
    DebugConfigurationContribution,
    {
      token: AbstractNodeExtProcessService,
      useClass: OverrideExtensionNodeService,
      override: true,
    },
    {
      token: BaseApplyService,
      useClass: ApplyService,
    },
  ];
}
