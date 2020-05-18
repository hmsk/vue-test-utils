import Vue, { VNodeData, ComponentOptions, FunctionalComponentOptions, Component } from 'vue'
import { DefaultProps, PropsDefinition } from 'vue/types/options'

/**
 * Utility type to declare an extended Vue constructor
 */
type VueClass<V extends Vue> = (new (...args: any[]) => V) & typeof Vue

/**
 * Utility type for a selector
 */
type Selector = string | Component | RefSelector | NameSelector

/**
 * Utility type for slots
 */
type Slots = {
  [key: string]: (Component | string)[] | Component | string
}

/**
 * Utility type for stubs which can be a string of template as a shorthand
 * If it is an array of string, the specified children are replaced by blank components
 */
type Stubs = {
  [key: string]: Component | string | boolean
} | string[]

/**
 * Utility type for ref options object that can be used as a Selector
 */
type RefSelector = {
  ref: string
}

/**
 * Utility type for name options object that can be used as a Selector
 */
type NameSelector = {
  name: string
}

/**
 * Base class of Wrapper and WrapperArray
 * It has common methods on both Wrapper and WrapperArray
 */
interface BaseWrapper {
  selector: Selector | void

  at (): void
  attributes (): { [name: string]: string }
  attributes (key: string): string | void
  classes (): Array<string> | void
  classes (className: string): boolean
  contains (selector: Selector): boolean | void
  destroy (): void
  emitted (): { [name: string]: Array<Array<any>>|undefined } | void
  emitted (event: string): Array<any>|undefined
  emittedByOrder (): Array<{ name: string, args: Array<any> }> | void
  exists (): boolean
  filter (): void
  html (): void
  is (): void
  is (selector: Selector): boolean | void
  isEmpty (): boolean | void
  isVisible (): boolean | void
  isVueInstance (): boolean | void
  name (): void
  overview (): void
  props (): { [name: string]: any }
  props (key: string): any | void
  setChecked (checked?: boolean): Promise<void> | void
  setSelected (): Promise<void> | void
  setData (data: object): Promise<void> | void
  setMethods (data: object): void
  setProps (props: object): Promise<void> | void
  setValue (value: any): Promise<void> | void
  text (): void
  trigger (eventName: string, options?: object): Promise<void> | void
}

export interface Wrapper<V extends Vue | null> extends BaseWrapper {
  readonly vm: V
  readonly element: HTMLElement
  readonly options: WrapperOptions

  get (selector: Selector): Wrapper<V>
  find (selector: Selector): Wrapper<V>
  findComponent (selector: Selector): Wrapper<V>
  findAll (selector: Selector): WrapperArray<V>
  findAllComponents (selector: Selector): WrapperArray<V>

  // Overwrites declarations on BaseWrapper
  attributes (): { [name: string]: string }
  attributes (key: string): string
  classes (): Array<string>
  classes (className: string): boolean
  contains (selector: Selector): boolean
  emitted (): { [name: string]: Array<Array<any>>|undefined }
  emitted (event: string): Array<any>|undefined
  emittedByOrder (): Array<{ name: string, args: Array<any> }>
  html (): string
  is (): boolean
  is (selector: Selector): boolean
  isEmpty (): boolean
  isVisible (): boolean
  isVueInstance (): boolean
  name (): string
  overview (): void
  props (): { [name: string]: any }
  props (key: string): any
  setChecked (checked?: boolean): Promise<void>
  setSelected (): Promise<void>
  setData (data: object): Promise<void>
  setProps (props: object): Promise<void>
  setValue (value: any): Promise<void>
  text (): string
  trigger (eventName: string, options?: object): Promise<void>
}

export interface WrapperArray<V extends Vue | null> extends BaseWrapper {
  readonly length: number
  readonly wrappers: Array<Wrapper<V>>

  // Overwrites declarations on BaseWrapper
  at (): void
  at (index: number): Wrapper<V>
  filter (): void
  filter (
    predicate: (
      value: Wrapper<V>,
      index: number,
      array: Wrapper<V>[]
    ) => any
  ): WrapperArray<V>
}

interface WrapperOptions {
  attachedToDocument?: boolean
}

interface MountOptions<V extends Vue> extends ComponentOptions<V> {
  attachToDocument?: boolean
  attachTo?: Element | string
  context?: VNodeData
  localVue?: typeof Vue
  mocks?: object | false
  parentComponent?: Component
  slots?: Slots
  scopedSlots?: Record<string, string | Function>
  stubs?: Stubs | false,
  attrs?: Record<string, string>
  listeners?: Record<string, Function | Function[]>
}

type ThisTypedMountOptions<V extends Vue> = MountOptions<V> & ThisType<V>

type ShallowMountOptions<V extends Vue> = MountOptions<V>

type ThisTypedShallowMountOptions<V extends Vue> = ShallowMountOptions<V> & ThisType<V>

interface VueTestUtilsConfigOptions {
  stubs?: Record<string, Component | boolean | string>
  mocks?: Record<string, any>
  methods?: Record<string, Function>
  provide?: Record<string, any>,
  silent?: Boolean,
  showDeprecationWarnings?: boolean
}

export declare function createLocalVue (): typeof Vue
export declare let config: VueTestUtilsConfigOptions

export declare function mount<V extends Vue> (component: VueClass<V>, options?: ThisTypedMountOptions<V>): Wrapper<V>
export declare function mount<V extends Vue> (component: ComponentOptions<V>, options?: ThisTypedMountOptions<V>): Wrapper<V>
export declare function mount<Props = DefaultProps, PropDefs = PropsDefinition<Props>> (component: FunctionalComponentOptions<Props, PropDefs>, options?: MountOptions<Vue>): Wrapper<Vue>

export declare function shallowMount<V extends Vue> (component: VueClass<V>, options?: ThisTypedShallowMountOptions<V>): Wrapper<V>
export declare function shallowMount<V extends Vue> (component: ComponentOptions<V>, options?: ThisTypedShallowMountOptions<V>): Wrapper<V>
export declare function shallowMount<Props = DefaultProps, PropDefs = PropsDefinition<Props>> (component: FunctionalComponentOptions<Props, PropDefs>, options?: ShallowMountOptions<Vue>): Wrapper<Vue>

export declare function createWrapper (node: Vue, options?: WrapperOptions): Wrapper<Vue>
export declare function createWrapper (node: HTMLElement, options?: WrapperOptions): Wrapper<null>

export declare let RouterLinkStub: VueClass<Vue>
